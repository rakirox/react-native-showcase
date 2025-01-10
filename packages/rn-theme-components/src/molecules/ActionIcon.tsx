import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {SmText} from '../atoms/Text';

export type ActionIconProps = {
  label?: string;
  icon?: 'filter' | 'sort' | 'grid' | 'list';
  onPress?: () => void;
};

const ICONS = {
  filter: require('../assets/icons/filter.png'),
  sort: require('../assets/icons/sort.png'),
  grid: require('../assets/icons/grid.png'),
  list: require('../assets/icons/list.png'),
};

export default function ActionIcon({label, icon, onPress}: ActionIconProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        {icon ? <Image source={ICONS[icon]} style={{marginRight: 5}} /> : null}
        {label ? <SmText>{label}</SmText> : null}
      </View>
    </TouchableOpacity>
  );
}
