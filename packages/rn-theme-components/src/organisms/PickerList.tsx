import React, {useEffect, useState} from 'react';
import Text from '../atoms/Text';
import {FlatList, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/theme';

export type OptionType = {
  label: string;
  value: string;
};

export type PickerListProps = {
  selected: string;
  options: OptionType[];
  onOptionSelected?: (option: OptionType) => void;
};

export default function PickerList({
  selected,
  onOptionSelected,
  options,
}: PickerListProps) {
  const {sizes} = useTheme();
  // const [currentSelected, setCurrentSelected] = useState<OptionType>(selected);
  // useEffect(() => {
  //   setCurrentSelected(selected);
  // }, [selected]);
  return (
    <>
      <Text style={{alignSelf: 'center', fontWeight: '600'}}>Sort by</Text>
      <FlatList<OptionType>
        style={{height: '100%'}}
        // data={['Newest', 'Price: lowest to high', 'Price: highest to low']}
        data={options}
        renderItem={({item}) => {
          const isSelected = selected === item.value;
          return (
            <TouchableOpacity onPress={() => onOptionSelected?.(item)}>
              <Text
                style={{
                  padding: sizes.global.padding,
                  fontWeight: '500',
                  backgroundColor: isSelected ? '#DB3022' : 'transparent',
                  color: isSelected ? 'white' : 'black',
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
