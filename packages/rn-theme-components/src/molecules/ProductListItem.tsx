import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import Text, {SmText} from '../atoms/Text';
import Stars from './Stars';
import {useTheme} from '../hooks/theme';
import Favorite from '../atoms/Favorite';
import Animated, {
  FadeOut,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import {ProductItemProps} from './ProductItem';

export default function ProductListItem({
  productImage,
  delayedTime = 0,
  onProductPress,
}: ProductItemProps) {
  const {sizes} = useTheme();
  const index = delayedTime / 200;
  return (
    <TouchableOpacity onPress={onProductPress} style={{width: '100%'}}>
      <Animated.View
        exiting={FadeOut}
        entering={(index % 2 === 0 ? SlideInLeft : SlideInRight).delay(
          delayedTime,
        )}
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: sizes.s,
          marginBottom: sizes.s,
        }}>
        <View>
          <Image source={productImage} style={{width: 104, height: 104}} />
        </View>
        <View style={{flex: 1, paddingLeft: sizes.s}}>
          <View style={{flexDirection: 'column'}}>
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
        <View style={{alignContent: 'flex-end', justifyContent: 'flex-end'}}>
          <Favorite />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
