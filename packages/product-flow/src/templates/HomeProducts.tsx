import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {
  CollectionHorizontalPreview,
  FeaturedCollection,
} from 'rn-theme-components';
import {useNavigation} from '@react-navigation/native';

export default function HomeProducts() {
  const {navigate} = useNavigation();
  return (
    <>
      <ScrollView>
        <FeaturedCollection
          onPress={() => navigate('Collection')}
          buttonText="Check"
          image={require('../assets/feature.jpg')}
          firstLine="Fashion"
          secondLine="sale"
        />
        <SafeAreaView>
          <CollectionHorizontalPreview
            productImage={require('../assets/product.png')}
            title="Sale"
            subtitle="Super summer sale!"
            actionButtonLabel="View all"
            onuButtonPress={() => navigate('Collection')}
            onProductPress={() => navigate('Product')}
          />
          <CollectionHorizontalPreview
            productImage={require('../assets/product.png')}
            title="New"
            subtitle="You've never seen it before!"
            actionButtonLabel="View all"
            onuButtonPress={() => navigate('Collection')}
            onProductPress={() => navigate('Product')}
          />
          <CollectionHorizontalPreview
            productImage={require('../assets/product.png')}
            title="New"
            subtitle="You've never seen it before!"
            actionButtonLabel="View all"
            onuButtonPress={() => navigate('Collection')}
            onProductPress={() => navigate('Product')}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
