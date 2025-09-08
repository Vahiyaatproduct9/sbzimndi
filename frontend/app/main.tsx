import React from 'react';
import Home from './home';
import ProductPage from './sections/product/mainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Main({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'home' | 'search' | 'add' | 'profile'>
  >;
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
          name="Product"
          options={{
            title: 'Details',
          }}
          component={ProductPage as never}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
