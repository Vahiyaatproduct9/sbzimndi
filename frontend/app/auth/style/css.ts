import { StyleSheet } from "react-native"
import Theme from "../../../colors/ColorScheme"
export default StyleSheet.create({
    container: {
        backgroundColor: Theme.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        maxHeight: 200,
    },
    headerText: {
        fontSize: 25,
        fontFamily: 'Barriecito-Regular',
        color: Theme.text
    },
    Image: {
        height: 100,
        width: 100,
        aspectRatio: 1,
    },
    inputContainer: {
        width: '100%',
        paddingVertical: 10,
    },
    inputText: {
        fontFamily: 'Geist',
        backgroundColor: Theme.tint,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.text,
        color: Theme.text
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        margin: 10,
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: Theme.extra,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        transform: 'translateY(1px)',
        // boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(255,255,255,0.4)'
    },
    buttonUnpressed: {
        boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.4)'
    },
    BtnTxt: {
        fontWeight: 700,
        fontSize: 18,
        color: Theme.text
    },
    footer: {
        color: Theme.text,
    }
})