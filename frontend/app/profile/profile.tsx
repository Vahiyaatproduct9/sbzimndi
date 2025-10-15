import React, { useEffect } from 'react';
import Options from '../auth/options/options';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../auth/signin/signin';
import Otp from '../auth/otp/otp';
import LoadingScreen from '../loadingScreen';
import ProfileScreen from './profileScreen';
import MainPage from '../auth/signup/mainPage';
const Stack = createNativeStackNavigator();
import { useProfileStore } from '../store/useProfileStore';
import { tabs } from 'types/types';

interface prop {
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
}
const Profile = ({ setActiveTab }: prop) => {
  const profile = useProfileStore(s => s.profile);
  useEffect(() => {
    console.log('logged in? ->', profile ? true : false);
  }, [profile]);
  // const getLocalProfile = async () =>
  //   await AsyncStorage.getItem('profile').then(res => JSON.parse(res || ''));
  return (
    // <Details />
    <NavigationContainer>
      <Stack.Navigator>
        {!profile ? (
          <>
            <Stack.Screen
              name="Options"
              component={Options}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signin"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={MainPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otp"
              initialParams={{ setActiveTab }}
              component={Otp}
              options={{ headerShown: false }}
            />
          </>
        ) : profile ? (
          // (async () => await getLocalProfile())() !== null &&
          // (async () => await getLocalProfile())().length !== 0
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ profile, setActiveTab }}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Loader"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <LoadingScreen />
  );
};

export default Profile;
