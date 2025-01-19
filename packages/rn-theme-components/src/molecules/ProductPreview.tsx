import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import Favorite from '../atoms/Favorite';
import Stars from './Stars';
import Text, {PsmText, SmText} from '../atoms/Text';
import {useTheme} from '../hooks/theme';

export type ProductPreviewProps = {
  onProductPress?: () => void;
  product: ProductType;
};

export type ProductType = {
  title: string;
  description: string;
  price: number;
  productImage: string;
  id: string;
};

export default function ProductPreview({
  product,
  onProductPress,
}: ProductPreviewProps) {
  const {sizes, colors} = useTheme();
  return (
    <TouchableOpacity onPress={onProductPress}>
      <View
        style={{
          width: 150,
          height: 260,
          marginRight: sizes.global.padding,
        }}>
        <View style={{justifyContent: 'flex-end'}}>
          <Image
            source={{uri: product.productImage, width: 148, height: 184}}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              paddingRight: 8,
              paddingBottom: 8,
            }}>
            <Favorite />
          </View>
        </View>
        <Stars />
        <SmText style={{color: colors.secondary}} numberOfLines={1}>
          {product.description}
        </SmText>
        <Text style={{fontWeight: 600}} numberOfLines={1}>
          {product.title}
        </Text>
        <PsmText style={{color: colors.tertiary}}>
          {/* <SmText
            style={{
              textDecorationLine: 'line-through',
              color: colors.secondary,
            }}>
            $15 */}
          ${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </PsmText>
      </View>
    </TouchableOpacity>
  );
}
