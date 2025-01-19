import React from 'react';
import {FlatList, ImageSourcePropType, View} from 'react-native';
import {useTheme} from '../hooks/theme';
import CollectionPreviewHeader, {
  CollectionPreviewHeaderProps,
} from './CollectionPreviewHeader';
import ProductPreview, {ProductType} from './ProductPreview';

export interface CollectionHorizontalPreviewProps
  extends CollectionPreviewHeaderProps {
  products?: ProductType[];
  onProductPress?: (productId: string) => void;
}

export default function CollectionHorizontalPreview({
  products = [],
  onProductPress,
  ...props
}: CollectionHorizontalPreviewProps) {
  const {sizes} = useTheme();
  return (
    <View>
      <CollectionPreviewHeader {...props} />
      <FlatList<ProductType>
        data={products}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: sizes.global.padding,
        }}
        renderItem={({item}) => (
          <ProductPreview
            product={item}
            onProductPress={() => {
              onProductPress?.(item.id);
            }}
          />
        )}
      />
    </View>
  );
}
