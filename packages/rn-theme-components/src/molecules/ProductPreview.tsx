import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import Favorite from '../atoms/Favorite';
import Stars from './Stars';
import Text, {PsmText, SmText} from '../atoms/Text';
import {useTheme} from '../hooks/theme';

export type ProductPreviewProps = {
  productImage: ImageSourcePropType;
  onProductPress?: () => void;
};

export default function ProductPreview({
  productImage,
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
          <Image source={productImage} resizeMode="cover" />
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
        <SmText style={{color: colors.secondary}}>Doroth Perkins</SmText>
        <Text style={{fontWeight: 600}}>Evening Dress</Text>
        <PsmText style={{color: colors.tertiary}}>
          <SmText
            style={{
              textDecorationLine: 'line-through',
              color: colors.secondary,
            }}>
            $15
          </SmText>
          {' $12'}
        </PsmText>
      </View>
    </TouchableOpacity>
  );
}
