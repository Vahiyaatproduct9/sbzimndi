import theme from '../../../../../../colors/ColorScheme'
import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor
    },
    block: {
        padding: 20,
        height: '100%',
        marginTop: 50,
        gap: 20
    },
    text: {
        color: theme.text,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})