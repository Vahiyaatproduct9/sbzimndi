import { StyleSheet } from "react-native";
import theme from "../../../../../../colors/ColorScheme";
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        height: '100%',
        width: '100%'
    },
    block: {
        padding: 13,
    },
    header: {
        color: theme.text,
        fontSize: 27,
        fontWeight: '600'
    },
    body: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '600'
    },
    subHeader: {
        color: theme.text,
        fontSize: 20,
    }
})