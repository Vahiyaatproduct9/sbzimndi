import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductPage from './productPage';
import Payment from './payment/payment';
const Stack = createNativeStackNavigator();
const MainPage = ({
  route,
}: {
  route: {
    params: {
      id: string;
      setActiveTab: React.Dispatch<
        React.SetStateAction<'home' | 'profile' | 'search' | 'additem'>
      >;
    };
  };
}) => {
  const { id, setActiveTab } = route.params;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="productPage"
          component={ProductPage}
          initialParams={{ id }}
        />
        <Stack.Screen
          name="RzpCheckout"
          component={Payment as never}
          initialParams={{ id, setActiveTab }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainPage;
