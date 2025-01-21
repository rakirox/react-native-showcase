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
        width: 44,
        height: 45,
        backgroundColor: 'white',
        borderWidth: selected ? 1 : 0,
        borderColor: colors.primary,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 36,
          height: 35,
          backgroundColor: color,
          borderRadius: '100%',
        }}
      />
    </View>
  );
}
