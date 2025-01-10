import React from 'react';
import {FlatList, ImageSourcePropType, View} from 'react-native';
import {useTheme} from '../hooks/theme';
import CollectionPreviewHeader, {
  CollectionPreviewHeaderProps,
} from './CollectionPreviewHeader';
import ProductPreview from './ProductPreview';

export interface CollectionHorizontalPreviewProps
  extends CollectionPreviewHeaderProps {
  productImage: ImageSourcePropType; // image of product exmample (thumnail)
  products?: number[];
  onProductPress?: () => void;
}

export default function CollectionHorizontalPreview({
  productImage,
  products = [1, 2, 3, 4, 5, 6, 7, 8],
  onProductPress,
  ...props
}: CollectionHorizontalPreviewProps) {
  const {colors, sizes} = useTheme();
  return (
    <View>
      <CollectionPreviewHeader {...props} />
      <FlatList
        data={products}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: sizes.global.padding,
        }}
        renderItem={({item}) => (
          <ProductPreview
            productImage={productImage}
            onProductPress={onProductPress}
          />
        )}
      />
    </View>
  );
}
