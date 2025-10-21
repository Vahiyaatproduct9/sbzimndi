import { StyleSheet } from "react-native"
import theme from '../../../../../../colors/ColorScheme'
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    head: {
        color: theme.text,
        fontSize: 26,
        fontWeight: 700,
        margin: 10,
        fontFamily: 'Barriecito-Regular'
    },
    subHead: {
        color: theme.text,
        fontSize: 18,
    },
    body: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
        flex: 1

    },
    textinput: {
        borderWidth: 1,
        width: 180,
        borderRadius: 20,
        fontSize: 20,
        padding: 10,
        color: theme.text,
        textAlign: 'center',
        borderColor: theme.text
    },
    buttonView: {
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: 10,
        padding: 10
    },
    button: {
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
        borderRadius: 20,
        backgroundColor: theme.extra,
    },
    buttonPressed: {
        transform: 'translateY(1px)',
    },
    buttonUnpressed: {
        boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.4)'
    },
    btntxt: {
        color: theme.text,
        fontSize: 20,
    }

})