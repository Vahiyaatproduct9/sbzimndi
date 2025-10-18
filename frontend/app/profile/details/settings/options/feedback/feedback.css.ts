import { StyleSheet } from "react-native"
import theme, { dark } from '../../../../../../colors/ColorScheme'
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        height: '100%'
    },
    head: {
        padding: 20
    },
    headingText: {
        color: theme.text,
        fontSize: 30,
        textAlign: 'center',

    },
    star: {
        fontSize: 30,
        color: theme.text
    },
    starPressed: {
        color: 'gold'
    },
    starContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    textContainer: {
        padding: 10,
    },
    textInput: {
        backgroundColor: dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        padding: 20,
        marginTop: 50,
        borderBottomColor: theme.tint,
        borderBottomWidth: 2,
        resizeMode: 'none',
        height: 120,
        textAlignVertical: 'top'
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        padding: 20
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        color: theme.text,
        fontSize: 18,
    },
    submitContainer: {
        width: '100%',
        backgroundColor: theme.tint,
        padding: 20,
        borderRadius: 20
    },
    submitText: {
        color: theme.text,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
})