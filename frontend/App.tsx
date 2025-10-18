import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import React from 'react';
import LoadingScreen from './app/loadingScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="LoadingScreen"
          options={{ headerShown: false }}
          component={LoadingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
