import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Theme from '../colors/ColorScheme.ts'

const LoadingScreen = () => {
    return (
        <SafeAreaView style={styles.con}>
            <View style={styles.container}>
                <Image style={styles.icon} source={require('../assets/images/fruit.png')} />
                <Text style={styles.text}>SbziMndi</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    con: {
        position: 'relative',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        right: 0,
        bottom: 0,
        backgroundColor: Theme.backgroundColor
    },
    container: {
    },
    text: {
        color: Theme.text,
        fontSize: 34,
        fontFamily: 'Barriecito-Regular, system-ui',
        fontWeight: '700',
        textAlign: 'center',
    },
    icon: {
        height: 200,
        width: 200
    }
})
