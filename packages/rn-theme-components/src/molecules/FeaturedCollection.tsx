import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  View,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {H1, H3, H5} from '../atoms/Text';
import {useTheme} from '../hooks/theme';
import Button from '../atoms/Button';

export type FeaturedCollectionProps = {
  image?: ImageSourcePropType;
  buttonText: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  firstLine?: string;
  secondLine?: string;
  isLoading?: boolean;
};

export default function FeaturedCollection({
  image,
  buttonText,
  onPress,
  firstLine = 'New Collection',
  secondLine = 'Out Now',
  isLoading,
}: FeaturedCollectionProps) {
  const {sizes} = useTheme();
  return (
    <View
      style={{
        height: 536,
        // backgroundColor: 'red',
        justifyContent: 'center',
      }}>
      {isLoading && (
        <ActivityIndicator style={{alignSelf: 'center'}} size="large" />
      )}
      {!isLoading && (
        <>
          <Image source={image} style={{flex: 1}} resizeMode="cover" />
          <SafeAreaView
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}>
            <LinearGradient
              colors={['#00000000', '#00000000', '#00000088']}
              style={{
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View style={{marginLeft: sizes.sm, marginBottom: sizes.m}}>
                <H1 style={{color: 'white'}}>{firstLine}</H1>
                <H5 style={{color: 'white', paddingBottom: sizes.m}}>
                  {secondLine}
                </H5>
                <Button label={buttonText} onPress={onPress} />
              </View>
            </LinearGradient>
          </SafeAreaView>
        </>
      )}
    </View>
  );
}
