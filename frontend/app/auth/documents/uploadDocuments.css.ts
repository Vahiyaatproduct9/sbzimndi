import { StyleSheet } from "react-native";
import theme from "../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
        padding: 20,
        paddingBottom: 60,
    },
    head: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {},
    inputField: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.tint,
        minWidth: '60%',
    },
    label: {
        fontSize: 16,
        color: theme.text,
    },
    photoContainer: {
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    Image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    textField: {
        borderWidth: 1,
        borderColor: theme.tint,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        color: theme.text,
    },
    footer: {
        paddingVertical: 10,
        borderTopWidth: 1,
    },
    button: {
        backgroundColor: theme.extra,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})