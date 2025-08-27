import { useSharedValue, useAnimatedStyle } from "react-native-reanimated"
export const imageProperty = {
    top: useSharedValue(0),
    opacity: useSharedValue(0)
}
export const spiritProperty = {
    right: useSharedValue(-30),
    opacity: useSharedValue(0)
}
export const svgProperty = {
    left: useSharedValue(-30),
    opacity: useSharedValue(0)
}
export const textProperty = {
    bottom: useSharedValue(-30),
    opacity: useSharedValue(0)
}
export const settingsProperty = {
    opacity: useSharedValue(0),
}
export const transform = useSharedValue(60)
export const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [{ rotate: `${transform.value}deg` }],
    }
})