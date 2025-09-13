import RNFS from 'react-native-fs';
import { cleanPath } from './imagePicker';

export default async (fileUri: string, fileName?: string): Promise<string> => {
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName || 'image.jpg'}`;
    await RNFS.copyFile(cleanPath(fileUri), cleanPath(destPath))
    .then(() => console.log('done'))
    return `file://${destPath}?time=${Date.now()}`;
}