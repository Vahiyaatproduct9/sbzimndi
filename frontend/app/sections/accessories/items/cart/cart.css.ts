import { StyleSheet } from "react-native";
import theme from '../../../../../colors/ColorScheme'

export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        // padding: 10,
        marginBottom: 50,

    },
    block: {
        padding: 10,
        borderRadius: 14,
        backgroundColor: theme.tint,
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12
    },
    imageContainer: {
        height: 120,
        width: 120,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 10
    },
    contentContainer: {
        flexDirection: 'row',
        flex: 1
    },
    content1: {
        flex: 1,
        justifyContent: 'space-around'
    },
    content2: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1
    },
    text1: {
        color: theme.text,
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 6
    },
    text2: {
        color: 'rgba(255,255,255,0.5)'
    },
    text3: {
        color: 'rgba(255,255,255,0.5)'
    },
    text4: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
        alignSelf: 'flex-end'
    },
    text5: {
        color: 'rgba(255,255,255,0.5)'
    },
    icon1: {
        backgroundColor: theme.extra,
        padding: 10,
        color: theme.text,
        borderRadius: 100,
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 50,
        height: 50,
        fontSize: 30
    },
    icon2: {
        backgroundColor: theme.extra,
        padding: 10,
        color: theme.text,
        borderRadius: 100,
        textAlign: 'center',
        verticalAlign: 'middle',
        alignSelf: 'flex-end'
    },
    iconBox: {
        // backgroundColor: 'yellow',
        // flex: 1,
        flexDirection: 'row',
        width: 'auto',
    },
    Notice: {
        textAlign: 'center',
        fontSize: 24,
        color: theme.text,
        fontWeight: '600',
        paddingVertical: 120
    }
})