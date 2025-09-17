import { StyleSheet } from "react-native";
import theme from "../../../colors/ColorScheme";

export default StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: theme.backgroundColor,
        minHeight: '100%',
        paddingBottom: 200
    },
    head: {
        padding: 20,
    },
    headText: {
        color: theme.text,
        fontSize: 23,
        textAlign: 'center',
        fontWeight: '700'
    },
    body: {
        padding: 20,

    },
    inputField: {
        gap: 10,
        paddingVertical: 30
    },
    label: {
        fontSize: 16,
        color: theme.text
    },
    textInput:{
        padding: 10,
        borderWidth: 1,
        borderColor: theme.extra,
        borderRadius: 15,
        fontSize: 16,
        color: theme.text
    },
    note:{
        backgroundColor: 'rgba(187, 80, 0, 0.4)',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    noteText: {
        color: theme.text,
        fontSize: 16,
    },
    footer:{
        padding: 10,
        marginBottom: 60
    },
    button:{
        padding: 20,
        borderRadius: 14,
        backgroundColor: theme.extra,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '600',
    },
    pressed: {
        transform: 'scale(0.98)',
    },
    disabled: {
        opacity: 0.5,
    }
})