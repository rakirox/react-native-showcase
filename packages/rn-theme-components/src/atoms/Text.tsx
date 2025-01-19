import React from 'react';

import {TextProps as RNTextProps, TextStyle} from 'react-native';
import {useTheme} from '../hooks/theme';
import Animated, {AnimateProps} from 'react-native-reanimated';
import {type AnimatedText} from 'react-native-reanimated/lib/typescript/component/Text';

export interface TextType extends AnimateProps<RNTextProps> {}

export default function Text(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle = {
    fontSize: sizes.font.p,
    color: colors.text,
  };
  return <Animated.Text {...props} style={[textStyle, props.style ?? {}]} />;
}

export function H1(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.h1,
    color: colors.text,
    fontWeight: 600,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}

export function H2(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.h2,
    color: colors.text,
    fontWeight: 600,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}

export function H3(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.h3,
    color: colors.secondary,
    fontWeight: 600,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}
export function H4(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.h4,
    color: colors.black500,
    fontWeight: 600,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}
export function H5(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.h5,
    color: colors.black500,
    fontWeight: 600,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}

export function SmText(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.sm,
    color: colors.secondary,
    fontWeight: 400,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}
export function PsmText(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.psm,
    color: colors.secondary,
    fontWeight: 400,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}
export function XsText(props: TextType) {
  const {colors, sizes} = useTheme();
  const textStyle: TextStyle = {
    fontSize: sizes.font.xs,
    color: colors.secondary,
    fontWeight: 400,
  };
  return <Text {...props} style={[textStyle, props.style ?? {}]} />;
}
