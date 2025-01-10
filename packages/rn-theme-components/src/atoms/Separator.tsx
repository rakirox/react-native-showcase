import React from 'react';
import {View} from 'react-native';

export default function Separator() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#000',
        opacity: 0.1,
        marginBottom: 10,
      }}
    />
  );
}
