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
import Cart from './sections/accessories/items/cart/cart';
import theme from '../colors/ColorScheme';
import OrderConfirmed from './sections/accessories/items/orders/confirmed/OrderConfirmed';
import OTP from './sections/accessories/items/orders/orderOTP/otp.tsx';
const Stack = createNativeStackNavigator();

export default function ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
}) {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.tint },

          headerTitleStyle: {
            color: theme.text,
          },
        }}
      >
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
          name="Cart"
          component={Cart}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="OrderOTP"
          component={OTP}
          options={{
            headerShown: true,
            title: 'Order Confirmation',
          }}
        />
        <Stack.Screen
          name="Confirmed"
          component={OrderConfirmed}
          options={{
            headerShown: false,
            title: 'Confirmed',
          }}
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
