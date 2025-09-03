import { launchImageLibrary } from 'react-native-image-picker'
import { Image as compressor } from 'react-native-compressor'
export default ({ setPhoto, setMess }: {
    setPhoto: (uri: string) => void,
    setMess: (mess: string) => void
}) => {
    launchImageLibrary(
        { mediaType: 'photo', selectionLimit: 1 },
        (res) => {
            if (!res.didCancel && !res.errorCode) {
                const compressedImg = async () => {
                    await compressor.compress(typeof res.assets !== 'undefined' && res.assets[0].uri || '', {
                        compressionMethod: 'manual',
                        maxWidth: 900,
                        maxHeight: 900,
                        quality: 0.7
                    })
                        .then((uri) => {
                            console.log('uri => ', uri)
                            typeof uri === 'string' ?
                                setPhoto(uri) : setMess('Invalid Photo')
                        })
                }
                compressedImg()
            }
        }
    )
}