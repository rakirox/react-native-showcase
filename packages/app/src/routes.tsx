import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductStack, ProductStackParamList} from 'product-flow';
import {Icon, Text, useTheme} from 'rn-theme-components';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

export type AppStackParamList = {
  HomeStack: ProductStackParamList;
  Shop: {};
  Bag: {};
  Favorites: {};
  Profile: {};
};

const Tab = createBottomTabNavigator<AppStackParamList>();

const UnderConstruction = () => {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{height: '100%', width: '100%'}}
        source={require('./assets/lottie/under_construction.json')}
        autoPlay
        loop
      />
    </View>
  );
};
export default function Routes() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey400,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={ProductStack}
        options={{
          header: () => undefined,
          tabBarLabel: 'Home',
          tabBarIcon: ({size, focused}) => (
            <Icon
              iconType={focused ? 'home-active' : 'home-inactive'}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={UnderConstruction}
        options={{
          header: () => undefined,
          tabBarLabel: 'Shop',
          tabBarIcon: ({focused, size}) => (
            <Icon
              iconType={focused ? 'shop-active' : 'shop-inactive'}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bag"
        component={UnderConstruction}
        options={{
          header: () => undefined,
          tabBarLabel: 'Bag',
          tabBarIcon: ({focused, size}) => (
            <Icon
              iconType={focused ? 'bag-active' : 'bag-inactive'}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={UnderConstruction}
        options={{
          header: () => undefined,
          tabBarLabel: 'Favorites',
          tabBarIcon: ({focused, size}) => (
            <Icon
              iconType={focused ? 'favorite-active' : 'favorite-inactive'}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UnderConstruction}
        options={{
          header: () => undefined,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, size}) => (
            <Icon
              iconType={focused ? 'profile-active' : 'profile-inactive'}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
