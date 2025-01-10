import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Star from '../atoms/Star';
import {SmText} from '../atoms/Text';
import {useTheme} from '../hooks/theme';

export type StarsProps = {
  style?: StyleProp<ViewStyle>;
};

export default function Stars({style}: StarsProps) {
  const {colors} = useTheme();
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <SmText style={{color: colors.secondary}}>(19)</SmText>
    </View>
  );
}
