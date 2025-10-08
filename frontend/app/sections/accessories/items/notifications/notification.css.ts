import { StyleSheet } from "react-native";
import theme from "../../../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        height: '100%',
        padding: 10,
        // gap: 10,
    },
    notification_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.extra,
        borderRadius: 10,
        minHeight: 60,
        paddingHorizontal: 7,
        alignItems: 'center',
        marginVertical: 5
    },
    notification_icon: {
        opacity: 0.5
    },
    notification_content: {
        padding: 10,
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        color: theme.text
    },
    option_container: {
        padding: 10,
        borderRadius: 10,
    },
    option: {
        textShadowRadius: 3
    },
    clicked: {
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    noNotification: {
        flex: 1,
        width: '100%',
        fontSize: 20,
        flexDirection: 'column',
        padding: 80,
        position: 'absolute',
        // left: 0,
        // right: 0,
        color: theme.text,
        // backgroundColor: 'red',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
}) 