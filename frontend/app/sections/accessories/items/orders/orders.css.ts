import { StyleSheet } from "react-native";
import theme from "../../../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: theme.backgroundColor,
        padding: 5,
    },
    mainBlock: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    block: {
        padding: 10,
        backgroundColor: theme.tint,
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    content: {
        flex: 1,
        padding: 7,
        justifyContent: 'space-around',
        // height: 100,
        maxHeight: 100,
        overflow: 'hidden',
        width: 'auto'
    },
    buyerName: {
        fontWeight: '600',
        color: theme.text,
        fontSize: 18,
    },
    productName: {
        color: theme.text,
    },
    price: {
        color: theme.text
    },
    footer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    date: {
        color: theme.text,
    },
    distance: {
        color: theme.text,
    },
    options: {
        flexDirection: 'row',
        gap: 30,
    },
    contact: {
        textShadowRadius: 4
    },
    profile: {
        textShadowRadius: 4
    },
    bold: {
        width: '100%',
        color: theme.text,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80
    },
    extraOptions: {
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: 120
    },
    optionButton: {
        // backgroundColor: 'red',
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionIcon: {
        fontSize: 25,
        color: theme.text,
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden'
    },
    option: {
        borderRadius: 10,
        borderColor: theme.tint,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        overflow: 'hidden'
    },
    optionText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: theme.text,
        fontSize: 16,
        width: 120,
    },
    red: {
        borderColor: 'red'
    },

})