import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductStack} from 'product-flow';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProductStack}
        options={{
          header: () => undefined,
        }}
      />
    </Tab.Navigator>
  );
}
