import { StyleSheet } from "react-native";
import theme from "../../../../../../colors/ColorScheme";
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor
    },
    block: {
        padding: 20,
        maxWidth: 600
    },
    text: {
        fontSize: 18,
        color: theme.text,
        textAlign: 'justify'
    },
    button: {
        position: 'absolute',
        bottom: 60,
        margin: 10,
        alignSelf: 'flex-end',
        padding: 20,
        backgroundColor: theme.tint,
        borderRadius: 20,
        alignItems: 'center',
        width: '65%',
        justifyContent: 'center'
    }
})