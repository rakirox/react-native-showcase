import React, {useEffect} from 'react';
import Product from '../templates/Product';
import {useNavigation} from '@react-navigation/native';
import {Navbar} from 'rn-theme-components';
import {useQuery} from '@apollo/client';
import GET_PRODUCT from '../graphql/product.graphql';
// import {  NavigationScreenProp } from '@react-navigation';

export default function ProductPage({route}: any) {
  const navigation = useNavigation();
  const {productId} = route.params;

  const {loading, data, error} = useQuery(GET_PRODUCT, {
    variables: {
      productID: productId,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Navbar
          icon="share"
          title={data?.product?.name}
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, data]);

  return (
    <Product
      assets={data?.product?.assets.map(asset => asset.source) ?? []}
      title={data?.product?.name}
      name={data?.product?.name}
      description={data?.product?.description}
      // onProductPress={() => {
      //   navigation.navigate('Product');
      // }}
    />
  );
}
