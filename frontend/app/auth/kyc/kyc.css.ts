import { StyleSheet } from "react-native";
import theme from "../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    scrollView: {
        marginBottom: 150,
    },
    head: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputField: {
        marginBottom: 20,
    },
    label: {
        padding: 10,
        fontSize: 16,
        color: theme.text
    },
    input: {
        borderWidth: 1,
        borderColor: theme.tint,
        borderRadius: 10,
        padding: 15,
        color: theme.text,
    },
    footer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: theme.backgroundColor,
        padding: 20,
    
    },
    skip: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    button: {
        backgroundColor: theme.extra,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 16,
    }
})