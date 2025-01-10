import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../hooks/theme';
import {H5} from '../atoms/Text';

export type IconsNavbar = 'search' | 'share';

export type NavbarProps = {
  onBackPress?: () => void;
  onActionPress?: () => void;
  icon?: IconsNavbar;
  title?: string;
};

export default function Navbar({
  onBackPress,
  onActionPress,
  title,
  icon,
}: NavbarProps) {
  const {sizes} = useTheme();
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: sizes.global.padding,
          // backgroundColor: 'white',
          // shadowColor: '#000',
          // shadowOffset: {width: 1, height: 1},
          // shadowOpacity: 0.4,
          // shadowRadius: 3,
          // elevation: 5,
        }}>
        <TouchableOpacity onPress={onBackPress}>
          <Image source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
        {!!title && <H5>{title}</H5>}
        <TouchableOpacity onPress={onActionPress}>
          <Image
            source={
              icon === 'search'
                ? require('../assets/icons/search.png')
                : require('../assets/icons/share.png')
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
