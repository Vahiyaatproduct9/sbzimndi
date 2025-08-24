import { StyleSheet } from "react-native";
import theme, { dark } from "../../../../colors/ColorScheme";
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        width: '100%',
        padding: 10
    },
    box: {
        width: '100%',
    },
    block: {
        width: '100%',
        borderBottomWidth: 1 / 3,
        borderCurve: 'continuous',
        borderColor: 'gray'
    },
    blockPressed: {
        backgroundColor: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    },
    press: {
        width: '100%',
        padding: 20,
        borderRadius: 6
    },
    optionText: {
        color: theme.text
    }
})