import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { SetStateAction } from 'react'
import Hero from './sections/hero/hero.tsx'
import Body from './sections/body/body.tsx'

type activeTab = 'home' | 'search' | 'add' | 'profile'
interface props {
    setActiveTab: React.Dispatch<SetStateAction<activeTab>>
}
export default function Main({ setActiveTab }: props) {
    return (
        <SafeAreaView style={styles.container}>
            <Hero setActiveTab={setActiveTab} />
            <Body />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    }
})