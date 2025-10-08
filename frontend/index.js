/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { AndroidImportance } from '@notifee/react-native';
import requestNotificationPermission from './app/functions/requestNotificationPermission';
// import getNotification from './api/getNotification';
import messaging from '@react-native-firebase/messaging';

// ✅ Background message handler (must be declared outside any function)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message received:', remoteMessage);
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Background Notification',
    body: remoteMessage.notification?.body || 'No message body',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
    },
  });
});

// ✅ Main initializer
async function initializeNotifications() {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const token = await requestNotificationPermission();
    console.log('FCM Token:', token);

    if (token) {
      messaging().onMessage(async remoteMessage => {
        console.log('Foreground message received:', remoteMessage);
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'New Update',
          body: remoteMessage.notification?.body || 'Check your app!',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
      });
    }
  } catch (err) {
    console.error('Notification setup failed:', err);
  }
}

// ✅ Call initializer
initializeNotifications();

AppRegistry.registerComponent(appName, () => App);
