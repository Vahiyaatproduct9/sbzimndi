/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { AndroidImportance } from '@notifee/react-native';
(async () => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
})();

AppRegistry.registerComponent(appName, () => App);
