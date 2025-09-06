import RNFS from 'react-native-fs'
export default async (sourcePath: string, fileName: string) => {
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}.png`
    try {
        await RNFS.copyFile(sourcePath, destPath)
        return destPath;
    }
    catch (err) {
        console.log(err)
        return null
    }
}