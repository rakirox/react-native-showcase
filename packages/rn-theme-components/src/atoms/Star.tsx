import React from 'react';
import {Image, View} from 'react-native';

export default function Star() {
  return (
    <View>
      <Image source={require('../assets/icons/star_activated.png')} />
    </View>
  );
}
