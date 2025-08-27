import { StyleSheet, Pressable, useWindowDimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import Theme from '../../colors/ColorScheme.ts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animation, { useSharedValue, withSpring } from 'react-native-reanimated'

type ActiveTab = 'home' | 'search' | 'add' | 'profile'

interface props {
    active: ActiveTab,
    setActive: React.Dispatch<React.SetStateAction<ActiveTab>>

}
const Tabs = (props: props) => {
    const animateProperty = {
        width: useSharedValue(20),
        borderRadius: useSharedValue(200),
        bottom: useSharedValue(20)
    }
    const w = useWindowDimensions()
    useEffect(() => {
        animateProperty.width.value = withSpring(w.width)
        animateProperty.borderRadius.value = withSpring(0)
        animateProperty.bottom.value = withSpring(0)
    }, [])
    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Animation.View style={[css.container, {
                width: animateProperty.width,
                borderRadius: animateProperty.borderRadius,
                bottom: animateProperty.bottom
            }]}>
                <Pressable onPress={() => props.setActive('home')} style={css.button}>
                    <Ionicons name={props.active === 'home' ? 'home' : 'home-outline'} size={30} color="#353535ff" />
                </Pressable>
                <Pressable onPress={() => props.setActive('search')} style={css.button}>
                    <Ionicons name={props.active === 'search' ? 'search' : 'search-outline'} size={30} color="#353535ff" />
                </Pressable>
                <Pressable onPress={() => props.setActive('add')} style={css.button}>
                    <Ionicons name={props.active === 'add' ? "add-circle-sharp" : 'add-circle-outline'} size={30} color="#353535ff" />
                </Pressable>
                <Pressable onPress={() => props.setActive('profile')} style={css.button}>
                    <Ionicons name={props.active === 'profile' ? "person" : 'person-outline'} size={30} color="#353535ff" />
                </Pressable>
            </Animation.View>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        position: 'relative',
        left: 0,
        right: 0,
        backgroundColor: Theme.tint
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})


export default Tabs