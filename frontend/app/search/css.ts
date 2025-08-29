import { StyleSheet } from 'react-native'
import theme, { dark } from '../../colors/ColorScheme.ts'
export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor,
        color: theme.text,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        gap: 10
    },
    textInput: {
        flex: 1,
        color: theme.text,
        backgroundColor: theme.tint,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.text
    },
    search: {
        backgroundColor: theme.tint,
        height: 40,
        width: 40,
        backgroundColor: theme.extra,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 400,
        borderWidth: 1,
        borderColor: theme.text
    },
    body: {
        padding: 10,
        width: '100%',
        display: 'flex',
        gap: 10,
        backgroundColor: 'red'
    },
    block: {
        width: '100%',
        backgroundColor: theme.tint,
        borderRadius: 10,
        boxShadow: '0 3px 20px 0 rgba(0,0,0,0.3)',
        flexDirection: 'row',
        overflow: 'hidden',
        gap: 10,
        marginBottom: 10
    },
    blockImage: {
        height: 100, width: 100,
        objectFit: 'cover',
    },
    blockInfo: {
        padding: 10,
        height: '100%',
        flex: 1,
        boxSizing: 'border-box'
    },
    blockInfoHead: {
        width: '100%',
        // backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
    },
    blockInfoInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 25
    },
    blockText: {
        fontWeight: 600,
        color: dark ? `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.6)`
    }
})