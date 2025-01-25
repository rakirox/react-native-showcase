import React from 'react';
import {ColorValue, TouchableOpacity, View, ViewProps} from 'react-native';
import Animated, {AnimatedProps} from 'react-native-reanimated';
import {useTheme} from '../hooks/theme';

export interface CircleColorOptionType extends AnimatedProps<ViewProps> {
  selected?: boolean;
  color: ColorValue;
  onPress?: () => void;
  innerStyle?: ViewProps;
}

export default function CircleColorOption({
  selected,
  color,
  onPress,
  style,
  innerStyle,
  ...props
}: CircleColorOptionType) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          {
            width: 44,
            height: 45,
            backgroundColor: 'white',
            borderWidth: selected ? 1 : 0,
            borderColor: colors.primary,
            borderRadius: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
        {...props}>
        <View
          style={{
            width: 36,
            height: 35,
            backgroundColor: color,
            borderRadius: '100%',
            ...innerStyle,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
