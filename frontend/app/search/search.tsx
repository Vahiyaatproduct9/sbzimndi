import { View, Text, SafeAreaView, TextInput, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import css from './css.ts'
import Feather from 'react-native-vector-icons/Feather'
import Animated, { withSpring, useSharedValue } from 'react-native-reanimated'
const Search = () => {
    const [searchContent, setSearchContent] = useState<string>('')
    const searchBarProperty = {
        width: useSharedValue(0),
        opacity: useSharedValue(0)
    }
    const searchButton = {
        width: useSharedValue(0),
        opacity: useSharedValue(0)
    }
    const width = useWindowDimensions().width
    useEffect(() => {
        searchBarProperty.width.value = withSpring(width)
        searchBarProperty.opacity.value = withSpring(1)
    }, [])
    useEffect(() => {
        if (searchContent.length > 0) {
            searchButton.width.value = withSpring(40)
            searchButton.opacity.value = withSpring(1)
        } else {
            searchButton.width.value = withSpring(0)
            searchButton.opacity.value = withSpring(0)
        }
    }, [searchContent])
    return (
        <SafeAreaView>
            <View style={css.container}>
                <Animated.View style={[css.header, searchBarProperty]}>
                    <TextInput value={searchContent} onChangeText={setSearchContent} style={[css.textInput,]} placeholder='Search' />
                    <Animated.View style={[searchButton,]}>
                        <Pressable style={css.search}>
                            <View>
                                <Feather name='search' size={32} color={css.container.color} />
                            </View>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

export default Search