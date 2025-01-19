import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductStack, ProductStackParamList} from 'product-flow';

export type AppStackParamList = {
  HomeStack: ProductStackParamList;
};

const Tab = createBottomTabNavigator<AppStackParamList>();

export default function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={ProductStack}
        options={{
          header: () => undefined,
        }}
      />
    </Tab.Navigator>
  );
}
