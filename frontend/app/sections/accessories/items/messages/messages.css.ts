import { StyleSheet } from "react-native";
import theme from "../../../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        padding: 10,
    },
    block: {
        padding: 10,
        backgroundColor: theme.tint,
        flexDirection: 'row',
        borderRadius: 10,
        gap: 10,
        marginVertical: 5,
    },
    profilePicture: {
        height: 60,
        width: 60,
        borderRadius: 23,
    },
    content: {
        flex: 1,
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text,
    },
    lastMessage: {
        color: 'rgba(244,244,244,0.4)',
    },
    info: {},
    time: {
        color: 'rgba(244,244,244,0.4)',
    }
})