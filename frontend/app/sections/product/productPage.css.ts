import { StyleSheet } from "react-native";
import theme from "../../../colors/ColorScheme";
export default StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        padding: 10,
        width: '100%',
        boxSizing: 'border-box',
    },
    imageContainer: {
        width: '100%',
        objectFit: 'cover',
        aspectRatio: 1,
        overflow: 'hidden',
        padding: 10,
        boxSizing: 'border-box'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    infoContainer: {
        padding: 10,
    },
    heading: {
        fontSize: 24,
        color: theme.text,
        fontWeight: 600
    },
    priceContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        color: theme.text,
        fontWeight: 600
    },
    ownerContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ownerBox: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    owner: {
        fontSize: 18,
        color: theme.text,
        fontWeight: 500
    },
    away: {
        fontSize: 16,
        color: theme.text,
    },
    descContainer: {
        padding: 10,
    },
    desc: {
        fontSize: 16,
        color: theme.text,
        lineHeight: 21
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    order: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.extra,
        padding: 14,
        borderRadius: 20,
    },
    pressed: {
        backgroundColor: 'rgba(255,127,80,0.6)',
    },
    orderText: {
        fontWeight: 600,
        fontSize: 20,
        color: 'white'
    }

})