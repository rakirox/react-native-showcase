import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from '../hooks/theme';
import Text, {PsmText, SmText} from './Text';

export type FilterButtonProps = {
  onButtonPress?: () => void;
  label?: string;
  selected?: boolean;
};

export default function FilterButton({
  onButtonPress,
  label,
  selected = false,
}: FilterButtonProps) {
  const {sizes, colors} = useTheme();
  return (
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
  );
}
