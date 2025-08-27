
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductPage from './productPage'
const Stack = createNativeStackNavigator()
const MainPage = () => {
    return (
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='productPage' component={ProductPage} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default MainPage