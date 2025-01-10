import React from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';

export type FavoriteProps = {
  style?: StyleProp<ViewStyle> | undefined;
};

export default function Favorite({style}: FavoriteProps) {
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 90,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.39,
          shadowRadius: 3,
          elevation: 10,
          width: 36,
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Image source={require('../assets/icons/favorite.png')} />
    </View>
  );
}
