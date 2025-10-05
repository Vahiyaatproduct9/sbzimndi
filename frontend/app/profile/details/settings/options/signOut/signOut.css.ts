import { StyleSheet } from "react-native";
import theme from "../../../../../../colors/ColorScheme";
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor
    },
    head: {
        width: '100%',
        fontSize: 23,
        color: theme.text,
        fontWeight: '600',
        paddingVertical: 180,
        textAlign: 'center',
        // backgroundColor: theme.extra
    },
    body: {
        padding: 20,
        // backgroundColor: theme.extra,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        flex: 1,
        borderRadius: 20,
        borderColor: theme.tint,
        borderWidth: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: theme.text,
        fontSize: 16,
        fontWeight: '600'
    }
})