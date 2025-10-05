import { StyleSheet } from "react-native";
import theme from "../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    text: {
        color: theme.text
    },
    box: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.extra
    },
    profile: {
        flex: 6
    },
    profile_box: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})