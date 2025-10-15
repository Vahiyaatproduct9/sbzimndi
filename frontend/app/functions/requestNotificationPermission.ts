import AsyncStorage from "@react-native-async-storage/async-storage";
import message from "@react-native-firebase/messaging";
export default async () => {
  const authStatus = await message().requestPermission();
  if (
    authStatus === message.AuthorizationStatus.AUTHORIZED ||
    authStatus === message.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('permission grantend:', authStatus);
    const token = await message().getToken()
    await AsyncStorage.setItem('fcmToken', token)
    return token
  } else {
    console.log('denied')
    return null
  };
}