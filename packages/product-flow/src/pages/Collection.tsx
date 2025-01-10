import React, {useEffect} from 'react';
import Collection from '../templates/Collection';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Navbar} from 'rn-theme-components';
// import {  NavigationScreenProp } from '@react-navigation';

export default function CollectionPage() {
  const navigation = useNavigation();
  useEffect(() => {
    console.log({navigation});

    navigation.setOptions({
      header: () => (
        <Navbar
          icon="search"
          title="Short dress"
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);
  return (
    <Collection
      onProductPress={() => {
        navigation.navigate('Product');
      }}
    />
  );
}
