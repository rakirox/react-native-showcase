import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '../hooks/theme';
import Animated, {AnimatedProps} from 'react-native-reanimated';

export default function Separator({style, ...props}: AnimatedProps<ViewProps>) {
  const {colors} = useTheme();
  return (
    <Animated.View
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: colors.grey300,
          marginBottom: 10,
        },
        style,
      ]}
      {...props}
    />
  );
}
