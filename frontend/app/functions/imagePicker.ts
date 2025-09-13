import { launchImageLibrary } from 'react-native-image-picker'
import { Image as compressor } from 'react-native-compressor'
import saveFIle from './saveFIle';
export const cleanPath = (uri: string) =>
    uri.toString().startsWith('file://')
        ? uri.toString().replace('file://', '')
        : uri.toString();
export default async ({ setPhoto, setMess, name }: {
    setPhoto: (uri: string) => void,
    setMess: (mess: string) => void,
    name?: string
}) => {
    launchImageLibrary(
        { mediaType: 'photo', selectionLimit: 1 },
        async (res) => {
            // path = await saveFIle(res.assets && typeof res.assets[0].uri === 'string' ? res.assets[0].uri : '', `${name || 'image'}.jpg`)
            if (!res.didCancel && !res.errorCode) {
                const compressedPath = await compressor.compress(typeof res.assets !== 'undefined' && res.assets[0].uri || '', {
                        compressionMethod: 'manual',
                        maxWidth: 900,
                        maxHeight: 900,
                        quality: 0.7
                    })
                    return await saveFIle(compressedPath, `${name || 'image'}.jpg`).then((newPath) => {
                        setPhoto(newPath);
                        return newPath;
                    }).catch((e) => {
                        setMess('Error setting image');
                        console.log('Error saving image:', e);
                        return '';
                    });
                }
            }
        )
        }