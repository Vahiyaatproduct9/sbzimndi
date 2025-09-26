import React, { useEffect } from 'react';
import Options from '../auth/options/options';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../auth/signin/signin';
// import SignUp from '../auth/signup/signup';
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
}
const Profile = ({ setActiveTab, logged, setLogged, profile }: prop) => {
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
            initialParams={{ setLogged, profile }}
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
