import { Pressable, StyleSheet, View } from 'react-native'
import React, { SetStateAction, useEffect } from 'react'
import theme, { dark } from '../../../colors/ColorScheme'
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated'

interface prop {
    value: boolean,
    pressedState: React.Dispatch<SetStateAction<boolean>>
}
const Switch = ({ pressedState, value }: prop) => {
    useEffect(() => {
        switchToggle.left.value = withTiming(value ? 21 : 2, {
            duration: 200,
            easing: Easing.out(Easing.quad)
        })
    }, [value])
    const switchToggle = {
        left: useSharedValue(2),
    }
    return (
        <View style={css.container}>
            <Pressable onPress={() => pressedState(prev => !prev)}>
                <View style={css.body}>
                    <Animated.View style={[css.toggle, switchToggle]} />
                </View>
            </Pressable>
        </View>
    )
}

export default Switch

const css = StyleSheet.create({
    container: {
        padding: 10,
        alignSelf: 'flex-end',
        width: 60
    },
    body: {
        width: 50,
        height: 30,
        backgroundColor: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        borderRadius: 200,
        justifyContent: 'center',
        padding: 2
    },
    toggle: {
        position: 'absolute',
        height: 27,
        width: 27,
        borderRadius: 200,
        backgroundColor: theme.tint
    }
})