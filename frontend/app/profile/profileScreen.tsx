import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from './details/details_v2'
import EditProfile from './details/editProfile/editProfile'
import Settings from './details/settings/settings'
const Stack = createNativeStackNavigator()
const ProfileScreen = ({ route }: any) => {
    const { setLogged } = route.params;
    return (
            <NavigationContainer independent>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='details' component={Details} initialParams={{ setLogged }} />
                    <Stack.Screen name='editProfile' component={EditProfile} initialParams={{ setLogged }} />
                    <Stack.Screen name='settings' component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default ProfileScreen