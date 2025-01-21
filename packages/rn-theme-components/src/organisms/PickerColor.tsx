import React from 'react';
import {View} from 'react-native';
import {H5} from '../atoms/Text';
import {useTheme} from '../hooks/theme';
import CircleColorOption from '../molecules/CircleColorOption';

export type PickerColorProps = {};
export type ColorType = {};

export default function PickerColor() {
  const {sizes} = useTheme();
  return (
    <View>
      <H5>Colors</H5>
      <View
        style={{
          padding: sizes.global.padding,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <CircleColorOption color="red" />
        <CircleColorOption color="blue" />
        <CircleColorOption color="orange" selected />
      </View>
    </View>
  );
}
