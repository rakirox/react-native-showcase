import React, {useEffect} from 'react';
import Collection from '../templates/Collection';
import {useNavigation} from '@react-navigation/native';
import {Navbar, ProductType} from 'rn-theme-components';
import {useQuery} from '@apollo/client';
import GET_COLLECTION from '../graphql/collection.graphql';
import {Product, ProductVariant} from '../gql/graphql';
// import {  NavigationScreenProp } from '@react-navigation';
// const LoadQuery = ({children}) => {
//   return <>{children}</>;
// };

export default function CollectionPage({route}: any) {
  const navigation = useNavigation();
  const {collectionId} = route.params;
  const {loading, error, data} = useQuery(GET_COLLECTION, {
    variables: {
      collectionID: collectionId,
    },
  });

  // useEffect(() => {
  //   console.log('changed status ' + loading + ' ' + error);
  // }, [loading]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Navbar
          icon="search"
          // title={data?.collection?.name}
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);
  return (
    <Collection
      onProductPress={productId => {
        navigation.navigate('Product', {productId});
      }}
      loading={loading}
      products={data?.collection?.productVariants.items as ProductVariant[]}
      title={data?.collection?.name}
    />
  );
}
