import mainPage from './mainPage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Theme from '../../../../colors/ColorScheme';
import ChangeLang from './options/changeLang/changeLang';
import SignOut from './options/signOut/signOut';
import Notifications from './options/notifications/notifications';
import EarnWithSbziMndi from './options/earnWithSbziMndi/earnWithSbziMndi';
import PrivacyPolicy from './options/privacyPolicy/privacyPolicy';
import DonateToSbziMndi from './options/donateToSbziMndi/donateToSbziMndi';
import Feedback from './options/feedback/feedback';
const Stack = createNativeStackNavigator();
const Settings = ({ route }: { route: any }) => {
  const { setActiveTab } = route.params;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: css.header,
          headerShadowVisible: false,
          headerTitleStyle: css.title,
          headerTintColor: Theme.text,
        }}
      >
        <Stack.Screen
          name="settings"
          component={mainPage}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="changeLang"
          component={ChangeLang}
          options={{ title: 'Change Language' }}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen
          name="signOut"
          initialParams={{ setActiveTab }}
          component={SignOut}
          options={{ title: 'Log Out' }}
        />
        <Stack.Screen
          name="earnWithSbziMndi"
          component={EarnWithSbziMndi}
          options={{ title: 'Earn With SbziMndi' }}
        />
        {/* <Stack.Screen
          name="privacyPolicy"
          component={PrivacyPolicy}
          options={{ title: 'Privacy Policy' }}
        /> */}
        <Stack.Screen
          name="donate"
          component={DonateToSbziMndi}
          options={{ title: 'Donate Us' }}
        />
        <Stack.Screen
          name="feedback"
          component={Feedback}
          options={{ title: 'Feedback' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const css = StyleSheet.create({
  header: {
    backgroundColor: Theme.backgroundColor,
    boxShadow: 'none',
  },
  title: {
    color: Theme.text,
  },
});

export default Settings;
