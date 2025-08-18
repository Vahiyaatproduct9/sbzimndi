import { StyleSheet } from "react-native";
import theme, { dark } from '../../../colors/ColorScheme.ts'
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor
    },
    settingsView: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: dark ? 'rgb(150,150,150)' : 'rgb(40,40,40)',
        height: 32,
        width: 32,
        zIndex: 2
    },
    head: {
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 600,
        zIndex: 1,
    },
    svgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    svg: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        color: theme.extra,
        opacity: 0.6,

    },
    body: {
        width: '100%',
        marginTop: 20,
        padding: 10,
        gap: 14,
        flex: 1

    },
    bodySectionContainer: {
    },
    bodySection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    bodyTxt: {
        color: theme.text,
        fontSize: 16,
        opacity: 0.7
    },
    bodySectionContent: {
        fontSize: 20,
        color: theme.text,
        marginLeft: 24
    },
    name: {
        fontSize: 25,
        fontWeight: 700
    },
    spirit: {
        height: 200,
        width: 200,
        position: 'absolute',
        right: 0
    },
    foot: {
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 50,
        right: 0,
        padding: 10,
        zIndex: 2,
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderColor: theme.text,
        borderWidth: 1,
    },
    buttonText: {
        color: theme.text
    }
})