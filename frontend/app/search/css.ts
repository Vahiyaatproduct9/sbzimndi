import { StyleSheet } from 'react-native'
import theme from '../../colors/ColorScheme.ts'
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor,
        color: theme.text,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        gap: 10
    },
    textInput: {
        flex: 1,
        color: theme.text,
        backgroundColor: theme.tint,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.text
    },
    search: {
        backgroundColor: theme.tint,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 400,
        borderWidth: 1,
        borderColor: theme.text
    }
})