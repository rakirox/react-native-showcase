import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import Text, {PsmText, SmText} from '../atoms/Text';
import Stars from './Stars';
import {useTheme} from '../hooks/theme';
import Favorite from '../atoms/Favorite';
import Animated, {BounceIn, FadeOut} from 'react-native-reanimated';
import {ProductItemProps} from './ProductItem';

export default function ProductGridItem({
  productImage,
  delayedTime = 0,
  onProductPress,
  name = 'Product Name',
  description = 'Product Description',
  price = '$10.00',
}: ProductItemProps) {
  const {sizes} = useTheme();
  const index = delayedTime / 200;
  return (
    <TouchableOpacity onPress={onProductPress}>
      <Animated.View
        exiting={FadeOut}
        entering={(index % 2 === 0 ? BounceIn : BounceIn).delay(delayedTime)}
        style={{
          flexDirection: 'column',
          marginVertical: sizes.s,
          marginHorizontal: sizes.global.padding,
          width: 160,
          overflow: 'hidden',
        }}>
        <View>
          <Image
            source={{uri: productImage}}
            style={{width: 160, height: 180}}
          />
          <Favorite
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: -15,
            }}
          />
        </View>
        <View style={{paddingLeft: sizes.s, flex: 1}}>
          <View
            style={{
              flexDirection: 'column-reverse',
            }}>
            <Text
              style={{fontWeight: '600', paddingTop: sizes.xs}}
              numberOfLines={1}>
              {name}
            </Text>
            <SmText
              style={{paddingBottom: sizes.xs}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {description.slice(0, 40)}
            </SmText>
            <Stars style={{marginVertical: sizes.xs}} />
          </View>
          <PsmText style={{fontWeight: '600'}}>{price}</PsmText>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
