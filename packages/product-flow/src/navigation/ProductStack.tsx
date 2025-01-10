import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeProducts from '../templates/HomeProducts';
import Collection from '../pages/Collection';
import Product from '../pages/Product';

const Stack = createNativeStackNavigator();
export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeProducts}
        options={{
          header: () => undefined,
        }}
      />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}
