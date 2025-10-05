import React from 'react';
import Home from './home';
import ProductPage from './sections/product/mainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { tabs } from '../types/signup';
import Notifications from './sections/accessories/items/notifications/notification';
import Messages from './sections/accessories/items/messages/messages';
import Orders from './sections/accessories/items/orders/orders';
const Stack = createNativeStackNavigator();

export default function Main({
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
