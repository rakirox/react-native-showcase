import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Collection from '../pages/Collection';
import Product from '../pages/Product';
import {Navbar} from 'rn-theme-components';

export type HomeParams = {};

export type ProductStackParamList = {
  Home: HomeParams;
  Collection: {collectionId: string};
  Product: {productId: string};
};

const Stack = createNativeStackNavigator<ProductStackParamList>();
export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => undefined,
        }}
      />
      <Stack.Screen
        name="Collection"
        component={Collection}
        options={{
          header: () => undefined,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: () => undefined,
        }}
      />
    </Stack.Navigator>
  );
}
