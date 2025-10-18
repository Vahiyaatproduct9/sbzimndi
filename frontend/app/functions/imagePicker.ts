import { launchImageLibrary } from 'react-native-image-picker';
import { Image as compressor } from 'react-native-compressor';
import RNFS from 'react-native-fs';
import saveFIle from './saveFIle';

export const cleanPath = (uri: string) =>
  uri.toString().startsWith('file://')
    ? uri.toString().replace('file://', '')
    : uri.toString();

export default async ({
  setPhoto,
  setMess,
  name,
}: {
  setPhoto: (uri: string) => void;
  setMess: (mess: string) => void;
  name?: string;
}) => {
  launchImageLibrary(
    { mediaType: 'photo', selectionLimit: 1 },
    async (res) => {
      if (res.didCancel || res.errorCode) return;

      const uri =
        res.assets && typeof res.assets[0].uri === 'string'
          ? res.assets[0].uri
          : '';

      if (!uri) return setMess('No image selected');

      try {
        const targetKB = 200;
        let quality = 0.8;
        let compressedPath = uri;
        let sizeKB = Infinity;

        // Compress repeatedly until size < target or quality < 0.3
        while (sizeKB > targetKB && quality >= 0.3) {
          compressedPath = await compressor.compress(uri, {
            compressionMethod: 'manual',
            maxWidth: 900,
            maxHeight: 900,
            quality,
          });

          const stat = await RNFS.stat(cleanPath(compressedPath));
          sizeKB = stat.size / 1024;

          console.log(`→ Quality ${quality.toFixed(1)} = ${Math.round(sizeKB)} KB`);
          quality -= 0.1;
        }

        // Save to local app storage
        const newPath = await saveFIle(
          compressedPath,
          `${name || 'image'}.jpg`
        );

        setPhoto(newPath);
        return newPath;
      } catch (e) {
        console.error('Error compressing or saving image:', e);
        setMess('Error setting image');
      }
    }
  );
};
