import { StyleSheet } from "react-native";
import theme from '../../../../../../colors/ColorScheme'
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.tint,
        opacity: 0,
        alignItems: 'center',
        justifyContent: 'center'

    },
    block: {
        // backgroundColor:
        alignItems: 'center',
        justifyContent: 'center'
    },
    block2: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 200,
        width: 200,
        position: 'absolute'
    },
    icon: {
        fontSize: 250,
        color: theme.extra
    },
    text: {
        fontSize: 24,
        color: theme.text,
        fontWeight: '600'
    }
})