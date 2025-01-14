import React from 'react';
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import {
  CollectionHorizontalPreview,
  FeaturedCollection,
  ProductType,
} from 'rn-theme-components';
import {Collection, ProductVariant} from '../gql/graphql';

export type HomeProductTypes = {
  onFeaturedPress: () => void;
  onViewCollectionPress: (collectionId: string) => void;
  onProductPress: (productId: string) => void;
  collections: Collection[];
};

export default function HomeProducts({
  collections,
  onFeaturedPress,
  onViewCollectionPress,
  onProductPress,
}: HomeProductTypes) {
  // TODO: refacvtor, templates must not depend on any navigation managment, should be managed by prop-cb events

  return (
    <>
      <ScrollView>
        <FeaturedCollection
          onPress={onFeaturedPress}
          buttonText="Check"
          image={require('../assets/feature.jpg')}
          firstLine="Fashion"
          secondLine="sale"
        />
        <SafeAreaView>
          <FlatList
            data={collections}
            keyExtractor={({id}) => id}
            renderItem={({item}) => {
              return (
                <CollectionHorizontalPreview
                  productImage={require('../assets/product.png')}
                  title={item.name}
                  products={item.productVariants.items.map(
                    (pVariant: ProductVariant) => {
                      const assets = [];
                      assets.push(
                        ...pVariant.assets,
                        ...pVariant.product.assets,
                      );
                      return {
                        id: pVariant.productId,
                        title: pVariant.name,
                        description: pVariant.product.description,
                        price: pVariant.price,
                        productImage: assets[0]?.source,
                      } as ProductType;
                    },
                  )}
                  subtitle={item.description}
                  actionButtonLabel="View all"
                  onuButtonPress={() => {
                    onViewCollectionPress(item.id);
                  }}
                  onProductPress={productId => {
                    // console.log({})
                    onProductPress(productId);
                  }}
                />
              );
            }}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
