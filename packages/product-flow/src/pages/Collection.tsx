import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQuery} from '@apollo/client';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Navbar, Text} from 'rn-theme-components';
import GET_SEARCH from '../graphql/search.graphql';
import {
  CollectionResult,
  FacetValueFilterInput,
  FacetValueResult,
  SearchResult,
  SearchResultSortParameter,
  SortOrder,
} from '../gql/graphql';
import Collection, {SortOption} from '../templates/Collection';
import {ProductStackParamList} from '../navigation/ProductStack';

export default function CollectionPage({route}: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  const [showTitleOnNavbar, setShowTitleOnNavbar] = useState(false);
  const [collection, setCollection] = useState<null | CollectionResult>(null);
  const {collectionId}: {collectionId: string | null} = route.params ?? {
    collectionId: null,
  };
  const [sortProducts, setSortProducts] = useState<SearchResultSortParameter>({
    name: 'ASC',
  } as SearchResultSortParameter);
  const [facetValueFilters, setFacetValueFilters] = useState<
    FacetValueFilterInput[]
  >([] as FacetValueFilterInput[]);

  const {loading, error, data} = useQuery(GET_SEARCH, {
    variables: {
      collectionId: `${collectionId}`,
      sort: sortProducts,
      skip: 0,
      take: 100,
      facetValueFilters,
    },
  });

  const onSort = useCallback(
    (option: SortOption) => {
      const sortOpt: SearchResultSortParameter = {};
      if (option.value === 'high-low') {
        sortOpt.price = SortOrder.DESC;
      } else if (option.value === 'low-high') {
        sortOpt.price = SortOrder.ASC;
      } else if (option.value === 'name-asc') {
        sortOpt.name = SortOrder.ASC;
      } else if (option.value === 'name-desc') {
        sortOpt.name = SortOrder.DESC;
      }
      setSortProducts(sortOpt);
    },
    [setSortProducts],
  );

  const onFilter = useCallback((facets: FacetValueResult[]) => {
    const ids = facets.map(filter => {
      return filter.facetValue.id;
    });
    const filter = {
      or: ids,
    };
    setFacetValueFilters([filter] as FacetValueFilterInput[]);
  }, []);
  useEffect(() => {
    if (!loading) {
      const colFound = data?.search?.collections?.find(
        csearch => collectionId === csearch.collection.id,
      ) as CollectionResult;
      setCollection(colFound);
    }
  }, [data?.search?.collections, loading]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Navbar
          icon="search"
          title={showTitleOnNavbar ? collection?.collection.name : undefined}
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, showTitleOnNavbar, collection]);

  if (collectionId === null) {
    return (
      <View>
        <Text>No collection Found</Text>
      </View>
    );
  }
  return (
    <Collection
      onProductPress={productId => {
        navigation.navigate('Product', {productId});
      }}
      loading={loading}
      products={data?.search?.items as SearchResult[]}
      title={collection?.collection.name}
      facets={data?.search.facetValues as FacetValueResult[]}
      collections={
        data?.search.collections.filter(
          cresult => cresult.collection.id !== collectionId,
        ) as CollectionResult[]
      }
      onTitleToggle={isShowing => setShowTitleOnNavbar(!isShowing)}
      onViewCollectionPress={collectionId =>
        navigation.push('Collection', {collectionId})
      }
      onSort={onSort}
      onFilter={onFilter}
    />
  );
}
