import React from 'react';
import Home from './home';
import ProductPage from './sections/product/mainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { tabs } from '../types/types';
import Notifications from './sections/accessories/items/notifications/notification';
import Messages from './sections/accessories/items/messages/messages';
import Orders from './sections/accessories/items/orders/orders';
import Text from './sections/accessories/items/messages/text/text';
import Details from './profile/details/details_v2';
const Stack = createNativeStackNavigator();

export default function ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
}) {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home as never}
          options={{ headerShown: false }}
          initialParams={{ setActiveTab }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          // initialParams={{ setActiveTab }}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Product"
          options={{
            title: 'Details',
          }}
          component={ProductPage as never}
          initialParams={{ setActiveTab }}
        />
        <Stack.Screen
          name="Profile"
          component={Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Text"
          component={Text}
          options={{ headerShown: false }}
          // initialParams={{ profile }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
