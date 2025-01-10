import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import Text, {SmText} from '../atoms/Text';
import Stars from './Stars';
import {useTheme} from '../hooks/theme';
import Favorite from '../atoms/Favorite';
import Animated, {BounceIn, FadeOut} from 'react-native-reanimated';
import {ProductItemProps} from './ProductItem';

export default function ProductGridItem({
  productImage,
  delayedTime = 0,
  onProductPress,
}: ProductItemProps) {
  const {sizes} = useTheme();
  const index = delayedTime / 200;
  return (
    <TouchableOpacity onPress={onProductPress}>
      <Animated.View
        exiting={FadeOut}
        entering={(index % 2 === 0 ? BounceIn : BounceIn).delay(delayedTime)}
        style={{
          // width: '100%',
          flexDirection: 'column',
          padding: sizes.s,
          marginBottom: sizes.s,
        }}>
        <View>
          <Image source={productImage} style={{width: 160, height: 180}} />
          <Favorite
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: -15,
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: sizes.s}}>
          <View style={{flexDirection: 'column-reverse'}}>
            <Text style={{fontWeight: '600', paddingTop: sizes.xs}}>
              Product name
            </Text>
            <SmText style={{paddingBottom: sizes.xs}}>
              Product description
            </SmText>
            <Stars style={{marginVertical: sizes.xs}} />
          </View>
          <Text style={{fontWeight: '600'}}>$100</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
