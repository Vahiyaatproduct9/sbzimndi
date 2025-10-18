// import { SetStateAction } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission(): Promise<boolean> {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'We need access to your location to continue.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // iOS automatically prompts when calling getCurrentPosition if not granted yet
            return true;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}
// export async function getandsetCoarseLocation(setLocation: (loc: [number, number, number]) => void, setMessage?: React.Dispatch<SetStateAction<string>>) {
//     Geolocation.getCurrentPosition(
//         (position) => {
//             const loc: [number, number, number] = [
//                 position.coords.longitude,
//                 position.coords.latitude,
//                 position.coords.accuracy
//             ];
//             return setLocation(loc);
//         },
//         (error) => {
//             return setMessage && setMessage(error.message);
//         },
//         { enableHighAccuracy: false }
//     );
// }

// export async function getAndSetLocation(setLocation: (loc: [number, number, number]) => void, setMessage?: React.Dispatch<SetStateAction<string>>) {
//     const hasPermission = await requestLocationPermission();
//     let localloc: number[] | null = null;
//     if (!hasPermission) {
//         setMessage && setMessage('Using Approximate Location')
//         await getandsetCoarseLocation(setLocation, setMessage);
//         return;
//     }
//     Geolocation.getCurrentPosition(

//         (position) => {
//             const loc: [number, number, number] = [
//                 position.coords.longitude,
//                 position.coords.latitude,
//                 position.coords.accuracy
//             ];
//             setLocation(loc);
//             localloc = loc
//         },
//         (error) => {
//             console.log(error)
//             setMessage && setMessage(error.message);
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
//     );
//     return localloc
// }