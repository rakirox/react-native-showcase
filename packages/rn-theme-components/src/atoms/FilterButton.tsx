import React from 'react';
import {TouchableOpacity, View, ViewProps} from 'react-native';
import {useTheme} from '../hooks/theme';
import Text, {PsmText, SmText} from './Text';
import Animated, {AnimatedProps} from 'react-native-reanimated';

export interface FilterButtonProps extends AnimatedProps<ViewProps> {
  onButtonPress?: () => void;
  label?: string;
  selected?: boolean;
}

export default function FilterButton({
  onButtonPress,
  label,
  selected = false,
  ...props
}: FilterButtonProps) {
  const {sizes, colors} = useTheme();
  return (
    <Animated.View {...props}>
      <TouchableOpacity onPress={onButtonPress}>
        <View
          style={{
            backgroundColor: selected ? colors.primary : 'black',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: sizes.m,
            borderRadius: 29,
            marginRight: sizes.s,
            height: 30,
          }}>
          <PsmText
            style={{color: 'white', textAlign: 'center', fontWeight: '600'}}>
            {label}
          </PsmText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
