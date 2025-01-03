import React from 'react';

import {Text as RNText, TextProps as RNTextProps} from 'react-native';

export default function Text(props: RNTextProps) {
  return (
    <RNText
      {...props}
      style={[{fontSize: 22, color: 'purple'}, props.style ?? {}]}
    />
  );
}
