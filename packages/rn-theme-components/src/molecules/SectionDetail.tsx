import React from 'react';
import {Image, View} from 'react-native';
import Text from '../atoms/Text';
import {useTheme} from '../hooks/theme';

type SectionDetailProps = {
  title: string;
};

export default function SectionDetail({title}: SectionDetailProps) {
  const {sizes} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: sizes.global.padding,
        alignItems: 'center',
      }}>
      <Text>{title}</Text>
      <Image
        source={require('../assets/icons/arrow-right.png')}
        style={{width: 18, height: 18}}
      />
    </View>
  );
}
