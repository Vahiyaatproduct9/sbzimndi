import { StyleSheet } from "react-native";
import theme from "../../../../../colors/ColorScheme";

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: theme.backgroundColor,
        padding: 7
    },
    block: {
        backgroundColor: theme.tint,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: 5,
    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    content: {
        flex: 1,
        padding: 7,
        justifyContent: 'space-around'
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
    }

})