import React, { useEffect, useState } from 'react';
import Options from '../auth/options/options';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../auth/signin/signin';
// import SignUp from '../auth/signup/signup';
import Otp from '../auth/otp/otp';
import LoadingScreen from '../loadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './profileScreen';
import MainPage from '../auth/signup/mainPage';
const Stack = createNativeStackNavigator();

type activeTab = 'home' | 'search' | 'add' | 'profile';
interface prop {
  setActiveTab: React.Dispatch<React.SetStateAction<activeTab>>;
}
const Profile = ({ setActiveTab }: prop) => {
  const [logged, setLogged] = useState<boolean | null>(null);
  useEffect(() => {
    const getaccess_token = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      if (
        access_token &&
        access_token.length > 0 &&
        refresh_token &&
        refresh_token.length > 0
      ) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    };
    getaccess_token();
  }, []);
  useEffect(() => {
    console.log('logged in? ->', logged);
  }, [logged]);
  return (
    // <Details />
    <NavigationContainer>
      <Stack.Navigator>
        {logged === false ? (
          <>
            <Stack.Screen
              name="Options"
              component={Options}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signin"
              component={SignIn}
              initialParams={{ setLogged }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={MainPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otp"
              initialParams={{ setActiveTab, setLogged }}
              component={Otp}
              options={{ headerShown: false }}
            />
          </>
        ) : logged === true ? (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ setLogged }}
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
