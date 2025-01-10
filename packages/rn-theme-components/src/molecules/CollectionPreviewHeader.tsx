import React from 'react';
import {useTheme} from '../hooks/theme';
import {TouchableOpacity, View} from 'react-native';
import {H4, SmText, XsText} from '../atoms/Text';

export type CollectionPreviewHeaderProps = {
  title: string;
  subtitle?: string;
  actionButtonLabel: string;
  onuButtonPress: () => void;
};

export default function CollectionPreviewHeader({
  title = 'New',
  subtitle,
  actionButtonLabel = 'View all',
  onuButtonPress,
}: CollectionPreviewHeaderProps) {
  const {colors, sizes} = useTheme();
  return (
    <View
      style={{
        padding: sizes.global.padding,
        flexDirection: 'row',
      }}>
      <View>
        <H4 style={{color: colors.black500, fontWeight: 700}}>{title}</H4>
        {!!subtitle && (
          <SmText style={{color: colors.grey500}}>{subtitle}</SmText>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={onuButtonPress}>
          <XsText
            style={{
              alignSelf: 'flex-end',
            }}>
            {actionButtonLabel}
          </XsText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
