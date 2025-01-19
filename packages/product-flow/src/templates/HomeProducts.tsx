import React from 'react';
import {FlatList, ImageSourcePropType} from 'react-native';
import {
  CollectionHorizontalPreview,
  FeaturedCollection,
  ProductType,
  Text,
} from 'rn-theme-components';
import removeMd from 'remove-markdown';
import {Collection, ProductVariant} from '../gql/graphql';

export type HomeProductTypes = {
  onFeaturedPress: () => void;
  onViewCollectionPress: (slug: string) => void;
  onProductPress: (productId: string) => void;
  collections: Collection[];
  featuredImage?: ImageSourcePropType;
  featuredTitle?: string;
  featuredSubtitle?: string;
  featuredLoading?: boolean;
};

export default function HomeProducts({
  collections,
  onFeaturedPress,
  onViewCollectionPress,
  onProductPress,
  featuredImage,
  featuredTitle,
  featuredSubtitle,
  featuredLoading,
}: HomeProductTypes) {
  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <FeaturedCollection
            onPress={onFeaturedPress}
            buttonText="Check"
            image={featuredImage}
            firstLine={featuredTitle}
            secondLine={featuredSubtitle}
            isLoading={featuredLoading}
          />
        )}
        data={collections}
        keyExtractor={({id}) => id}
        renderItem={({item}) => {
          return (
            <CollectionHorizontalPreview
              title={item.name}
              products={item.productVariants.items.map(
                (pVariant: ProductVariant) => {
                  const assets = [];
                  assets.push(...pVariant.assets, ...pVariant.product.assets);
                  return {
                    id: pVariant.id,
                    title: pVariant.name,
                    description: pVariant.product.description,
                    price: pVariant.price,
                    productImage: assets[0]?.source,
                  } as ProductType;
                },
              )}
              subtitle={removeMd(item.description)}
              actionButtonLabel="View all"
              onuButtonPress={() => {
                onViewCollectionPress(item.id);
              }}
              onProductPress={onProductPress}
            />
          );
        }}
      />
    </>
  );
}
