import React, {useMemo} from 'react';
import {Image, ImageProps} from 'react-native';

type IconType =
  | 'dropdown'
  | 'home-inactive'
  | 'home-active'
  | 'shop-inactive'
  | 'shop-active'
  | 'bag-inactive'
  | 'bag-active'
  | 'favorite-inactive'
  | 'favorite-active'
  | 'profile-inactive'
  | 'profile-active'
  | 'arrow-right';

interface IconPropType extends ImageProps {
  iconType: IconType;
}

export default function Icon({iconType, ...props}: IconPropType) {
  const image = useMemo(() => {
    switch (iconType) {
      case 'dropdown':
        return require('../assets/icons/dropdown.png');
      case 'home-active':
        return require('../assets/icons/home_active.png');
      case 'home-inactive':
        return require('../assets/icons/home_inactive.png');
      case 'shop-active':
        return require('../assets/icons/shop_active.png');
      case 'shop-inactive':
        return require('../assets/icons/shop_inactive.png');
      case 'bag-active':
        return require('../assets/icons/bag_active.png');
      case 'bag-inactive':
        return require('../assets/icons/bag_inactive.png');
      case 'favorite-active':
        return require('../assets/icons/favorite_active.png');
      case 'favorite-inactive':
        return require('../assets/icons/favorite_inactive.png');
      case 'profile-active':
        return require('../assets/icons/profile_active.png');
      case 'profile-inactive':
        return require('../assets/icons/profile_inactive.png');
      case 'arrow-right':
        return require('../assets/icons/arrow_right.png');
      default:
        break;
    }
  }, [iconType]);

  return <Image source={image} {...props} />;
}
