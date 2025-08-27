import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Theme from '../../../colors/ColorScheme.ts'
import Animated, { withSpring, useSharedValue, withDelay } from 'react-native-reanimated'

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    innerStyle?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style, innerStyle }) => {
    // const Atransform = useSharedValue(30)
    const containerProperty = {
        top: useSharedValue(30),
        opacity: useSharedValue(0)
    }
    useEffect(() => {
        // Atransform.value = withSpring(0)
        containerProperty.opacity.value = withDelay(0, withSpring(1))
        containerProperty.top.value = withDelay(0, withSpring(0))
    }, [])

    return (
        <View style={[css.UltimateContainer, style]}>
            <Animated.View style={[css.container, containerProperty, innerStyle]}>
                {children}
            </Animated.View>
        </View>)
};

const css = StyleSheet.create({
    UltimateContainer: {
        width: '100%',
        padding: 10,
    },
    container: {
        boxSizing: 'border-box',
        display: 'flex',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        overflow: 'hidden',
        boxShadow: '0 10px 13px 2px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 1px rgba(0,0,0,0.4)',
        backgroundColor: Theme.tint
    },
})
export default Card