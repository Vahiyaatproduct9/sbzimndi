import { StyleSheet } from "react-native";
import theme, { dark } from "../../../../../../colors/ColorScheme";
const hiddenChatHeight = 120;
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        height: '100%',
        width: '100%'
    },
    titleBar: {
        backgroundColor: theme.tint,
        padding: 10,
        minHeight: 60,
        alignItems: 'center',
        gap: 10,
        top: 0,
        overflow: 'hidden'
    },
    titleView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titleHidden: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        gap: 50,
        position: 'absolute',
        top: 10,
    },
    hiddenOptions: {
        height: hiddenChatHeight,
        // You'll regret it later not changing it to 'column' HAHA
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: 10
    },
    option: {
        flex: 1,
        padding: 8,
        paddingRight: 12,
        width: '100%',
        maxHeight: 55,
        backgroundColor: theme.extra,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    optionText: {
        color: theme.text,
        fontSize: 16
    },
    profilePicture: {
        height: hiddenChatHeight,
        width: hiddenChatHeight,
        borderRadius: 100,
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
    },
    icon: {
        color: theme.text,
        textShadowRadius: 2,
        padding: 5,
    },
    name: {
        color: theme.text,
        fontWeight: '600',
        fontSize: 18,
        flex: 1,
    },
    options: {
        flexDirection: 'row',

    },
    textArea: {
        // backgroundColor: theme.extra,
        position: 'absolute',
        bottom: 60,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    textInput: {
        backgroundColor: dark ? 'rgba(100,100,100,0.8)' : 'white',
        color: theme.text,
        borderRadius: 16,
        flex: 1,
        paddingHorizontal: 10,
    },
    sendIcon: {
    },
    TextContainer: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    TextText: {
        color: theme.text,
    },
    TFHContainer: {
        backgroundColor: theme.tint,
        alignItems: 'flex-end'
    },
    TFTContainer: {
        backgroundColor: theme.extra
    }
})