
import React from 'react'
import { NavigationIndependentTree, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductPage from './productPage'
const Stack = createNativeStackNavigator()
const MainPage = () => {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='productPage' component={ProductPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    )
}

export default MainPage