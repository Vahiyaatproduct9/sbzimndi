import { StyleSheet } from 'react-native'
import theme from '../../colors/ColorScheme'
export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        flex: 1,
        minHeight: '100%',
        width: '100%',
        padding: 10,
        color: theme.tint,
        overflow: 'scroll',
        paddingBottom: 200

    },
    header: {
        width: '100%',
        padding: 10,
        textAlign: 'center',
        fontSize: 23,
        color: theme.text,
        fontWeight: 700
    },
    body: {
        height: '100%',
        paddingBottom: 130
    },
    photo: {
        maxHeight: 400,
        minHeight: 250,
        flex: 1,
        borderRadius: 15,
        outlineStyle: 'dashed',
        outlineWidth: 2,
        outlineColor: theme.text,
    },
    photoView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadedPhoto: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    },
    photoTxt: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.tint,
        fontSize: 20,
    },
    content: {
        paddingTop: 20,
    },
    contentSectionHorizontal: {
        flexDirection: 'row'
    },
    contentSection: {
        padding: 10,
    },
    contentName: {
        color: theme.text,
        fontSize: 18
    },
    dateBtn: {
        backgroundColor: theme.tint,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        fontSize: 17,
        marginTop: 5,
        boxShadow: '0 10px 13px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 1px rgba(0,0,0,0.4)',

    },
    nameInput: {
        backgroundColor: theme.tint,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        fontSize: 16,
        marginTop: 5,
        color: theme.text,
        boxShadow: '0 10px 13px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 1px rgba(0,0,0,0.4)',
    },
    focused: {

    },
    focused2: {
        boxShadow: `0 0 13px 2px ${theme.tint}, inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 1px rgba(0,0,0,0.4)`,
        paddingLeft: 20
    },
    buttonView: {
        width: '100%',
        padding: 10,
    },
    button: {
        paddingVertical: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: theme.tint,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `0 0 13px 2px rgba(0,0,0,0.3)`
    },
    buttonTxt: {
        fontSize: 18,
        fontWeight: 700,
        color: theme.text,
    },
    note: {
        padding: 20,
        backgroundColor: 'rgba(255,255,0,0.4)',
        borderRadius: 3,

    },
    noteTxt: {
        color: 'white',
        fontSize: 12
    }
})