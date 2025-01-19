import React, {useEffect} from 'react';
import Home from '../templates/HomeProducts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import GET_COLLECTIONS from '../graphql/collections.graphql';
import {Collection} from '../gql/graphql';
import GET_COLLECTION from '../graphql/collection.graphql';
import removeMd from 'remove-markdown';
import {ProductStackParamList} from '../navigation/ProductStack';

// TODO: Featured Collection, this could be a great implementation with remote confs
const featuredSlug = 'equipment';

export default function HomePage() {
  const {loading, error, data} = useQuery(GET_COLLECTIONS);
  const {
    loading: loadingFeatured,
    error: errorOnFeatured,
    data: featuredData,
  } = useQuery(GET_COLLECTION, {
    variables: {
      slug: featuredSlug,
    },
  });
  const {navigate} = useNavigation<NavigationProp<ProductStackParamList>>();
  return (
    <Home
      onFeaturedPress={() =>
        navigate('Collection', {
          collectionId: featuredData?.collection?.id ?? '',
        })
      }
      collections={((data?.collections.items as Collection[]) ?? []).sort(
        (a, b) => a.position - b.position,
      )}
      onViewCollectionPress={collectionId => {
        navigate('Collection', {collectionId});
      }}
      onProductPress={productId => {
        navigate('Product', {productId});
      }}
      featuredImage={{uri: featuredData?.collection?.featuredAsset?.preview}}
      featuredTitle={featuredData?.collection?.name}
      featuredSubtitle={removeMd(featuredData?.collection?.description ?? '')}
      featuredLoading={loadingFeatured}
    />
  );
}
