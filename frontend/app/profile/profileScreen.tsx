import React, { useEffect, useState } from 'react'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from './details/details_v2'
import EditProfile from './details/editProfile/editProfile'
import Settings from './details/settings/settings'
const Stack = createNativeStackNavigator()
const ProfileScreen = () => {
    const [change, setchange] = useState<boolean>(false)
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='details' component={Details} initialParams={{ change, setchange }} />
                    <Stack.Screen name='editProfile' component={EditProfile} initialParams={{ setchange, change }} />
                    <Stack.Screen name='settings' component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    )
}

export default ProfileScreen