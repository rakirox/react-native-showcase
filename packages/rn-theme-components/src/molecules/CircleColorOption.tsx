import React from 'react';
import {ColorValue, View} from 'react-native';
import {useTheme} from '../hooks/theme';

export type CircleColorOptionType = {
  selected?: boolean;
  color: ColorValue;
};

export default function CircleColorOption({
  selected,
  color,
}: CircleColorOptionType) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        width: 45,
        height: 45,
        backgroundColor: 'white',
        borderWidth: selected ? 1 : 0,
        borderColor: colors.primary,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: color,
          borderRadius: 90,
        }}
      />
    </View>
  );
}
