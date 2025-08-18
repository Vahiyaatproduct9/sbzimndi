import { StyleSheet } from "react-native";
import theme, { dark as d } from '../../../../colors/ColorScheme.ts'
export default StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: theme.backgroundColor,
        padding: 10
    },
    box: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
        paddingBottom: 50
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 600,
        zIndex: 1,
    },
    changeBtn: {
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.text,
    },
    text: {
        color: theme.text
    },
    label: {
        fontSize: 20,
    },
    TextBox: {
        width: '100%',
        marginTop: 10
    },
    switch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: d ? 'rgb(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: theme.tint,
        padding: 10,
        color: theme.text
    },
    bio: {
        height: 100,
        marginBottom: 20,
        textAlignVertical: 'top'
    },
    picker: {},
    saveBtn: {
        marginBottom: 30
    }

})