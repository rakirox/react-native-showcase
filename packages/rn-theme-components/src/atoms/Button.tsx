import React from 'react';

import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../hooks/theme';
import Text from './Text';

export type ButtonProps = {
  label: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  style?: StyleProp<ViewStyle>;
};

export default function Button({label, onPress, style}: ButtonProps) {
  const {colors, sizes} = useTheme();
  // const textStyle = {
  //   fontSize: sizes.font.p,
  //   color: colors.text,
  // };
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: colors.primary,
            alignSelf: 'flex-start',
            paddingVertical: sizes.s,
            paddingHorizontal: sizes.xl,
            borderRadius: sizes.global.radius * 6,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        <Text style={{color: 'white', fontWeight: '600'}}>{label}</Text>
      </View>
    </Pressable>
  );
}
