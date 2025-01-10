import React, {useEffect} from 'react';
import Product from '../templates/Product';
import {useNavigation} from '@react-navigation/native';
import {Navbar} from 'rn-theme-components';
// import {  NavigationScreenProp } from '@react-navigation';

export default function ProductPage() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Navbar
          icon="share"
          title="Short dress"
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);
  return (
    <Product
    // onProductPress={() => {
    //   navigation.navigate('Product');
    // }}
    />
  );
}
