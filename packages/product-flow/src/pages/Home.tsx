import React, {useEffect} from 'react';
import Home from '../templates/HomeProducts';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import GET_COLLECTIONS from '../graphql/collections.graphql';
import {Collection} from '../gql/graphql';

export default function HomePage() {
  const {loading, error, data} = useQuery(GET_COLLECTIONS);
  console.log({error, loading}, data?.collections.totalItems);
  const {navigate} = useNavigation();
  return (
    <Home
      onFeaturedPress={() => navigate('Collection')}
      collections={data?.collections.items as Collection[]}
      onViewCollectionPress={collectionId => {
        navigate('Collection', {collectionId});
      }}
      onProductPress={productId => {
        navigate('Product', {productId});
      }}
      // onProductPress={() => {
      //   navigation.navigate('Product');
      // }}
    />
  );
}
