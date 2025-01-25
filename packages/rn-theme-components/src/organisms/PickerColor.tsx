import React from 'react';
import {FlatList, View} from 'react-native';
import {H5} from '../atoms/Text';
import {useTheme} from '../hooks/theme';
import CircleColorOption from '../molecules/CircleColorOption';

export type PickerColorProps = {
  colors?: ColorType[];
  onColorPress?: (color: ColorType) => void;
  selectedColors?: ColorType[];
};
export type ColorType<T = any> = {
  color: string;
  value: T;
};

export default function PickerColor({
  colors,
  onColorPress,
  selectedColors,
}: PickerColorProps) {
  const {sizes} = useTheme();
  if (!colors) {
    return null;
  }
  return (
    <View>
      <H5>Colors</H5>
      <FlatList
        data={colors}
        horizontal
        style={{}}
        contentContainerStyle={{
          padding: sizes.global.padding,
          justifyContent: 'space-around',
          flex: 1,
        }}
        renderItem={({item}) => {
          return (
            <CircleColorOption
              selected={selectedColors?.some(c => c.color === item.color)}
              color={item.color}
              onPress={() => {
                onColorPress?.(item);
              }}
            />
          );
        }}
      />
    </View>
  );
}
