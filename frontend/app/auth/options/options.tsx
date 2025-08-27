import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../../colors/ColorScheme'


const Options = ({ navigation }: any) => {
    return (<View style={css.container}>
        <Pressable onPress={() => navigation.navigate('signin')} style={css.button}>
            <Text style={css.text}>Sign In</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('signup')} style={[css.button, { backgroundColor: 'transparent', borderWidth: 1 }]}>
            <Text style={css.text}>Sign Up</Text>
        </Pressable>

    </View>
    )
}

export default Options

const css = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.backgroundColor
    },
    button: {
        backgroundColor: Theme.extra,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50
    },
    text: {
        color: Theme.text,
        fontSize: 18
    }
})