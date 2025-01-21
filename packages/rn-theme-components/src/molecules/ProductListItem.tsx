import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeOut,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import Text, {PsmText, SmText} from '../atoms/Text';
import Stars from './Stars';
import {useTheme} from '../hooks/theme';
import Favorite from '../atoms/Favorite';
import {ProductItemProps} from './ProductItem';

export default function ProductListItem({
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
    <TouchableOpacity onPress={onProductPress} style={{width: '100%'}}>
      <Animated.View
        exiting={FadeOut}
        entering={(index % 2 === 0 ? SlideInLeft : SlideInRight).delay(
          delayedTime,
        )}
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: sizes.global.padding,
          marginBottom: sizes.s,
        }}>
        <View>
          <Image
            source={{uri: productImage}}
            style={{width: 104, height: 104}}
          />
        </View>
        <View style={{flex: 1, paddingLeft: sizes.s}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '600', paddingTop: sizes.xs}}>
              {name}
            </Text>
            <SmText style={{paddingBottom: sizes.xs}} numberOfLines={2}>
              {description}
            </SmText>
            <Stars style={{marginVertical: sizes.xs}} />
          </View>
          <PsmText style={{fontWeight: '600'}}>{price}</PsmText>
        </View>
        <View style={{alignContent: 'flex-end', justifyContent: 'flex-end'}}>
          <Favorite />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
