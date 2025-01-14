import React from 'react';
import {Image} from 'react-native';

type IconType = 'dropdown';

type IconPropType = {
  type: IconType;
};

export default function Icon({type}: IconPropType) {
  switch (type) {
    case 'dropdown':
      return <Image source={require('../assets/icons/dropdown.png')} />;

    default:
      break;
  }
}
