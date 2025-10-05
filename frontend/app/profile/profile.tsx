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

type activeTab = 'home' | 'search' | 'add' | 'profile';
interface prop {
  setActiveTab: React.Dispatch<React.SetStateAction<activeTab>>;
  logged: boolean | null;
  setLogged: React.Dispatch<React.SetStateAction<boolean | null>>;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}
const Profile = ({
  setProfile,
  setActiveTab,
  logged,
  setLogged,
  profile,
}: prop) => {
  useEffect(() => {
    console.log('logged in? ->', logged);
  }, [logged]);
  // const getLocalProfile = async () =>
  //   await AsyncStorage.getItem('profile').then(res => JSON.parse(res || ''));
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
              initialParams={{ setLogged, setProfile }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={MainPage}
              initialParams={{ setProfile, setLogged, setActiveTab }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otp"
              initialParams={{ setActiveTab, setLogged }}
              component={Otp}
              options={{ headerShown: false }}
            />
          </>
        ) : logged === true && profile !== 0 ? (
          // (async () => await getLocalProfile())() !== null &&
          // (async () => await getLocalProfile())().length !== 0
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ setLogged, profile, setActiveTab }}
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
