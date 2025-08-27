import { View, Text, SafeAreaView, TextInput, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import css from './css.ts'
import Feather from 'react-native-vector-icons/Feather'
import Animated, { withSpring, useSharedValue } from 'react-native-reanimated'
import search from '../../api/search.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getandsetCoarseLocation } from '../../api/getLocation.ts'
const Search = () => {
    const [searchContent, setSearchContent] = useState<string>('')
    const [searchHistory, setSearchHistory] = useState<number>(0)
    const [location, setLocation] = useState<any | null>(null)
    const [searchResult, setSearchResult] = useState<any | null>(null)
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
        // Animation for the next 2 lines
        searchBarProperty.width.value = withSpring(width)
        searchBarProperty.opacity.value = withSpring(1)

        // Getting location from local Storage
        const setLoc = async () => {
            const location = await AsyncStorage.getItem('location')
            if (typeof location === 'string' && location.length > 0) {
                const parsedLoc = JSON.parse(location)
                if (parsedLoc[0] !== 0 || parsedLoc[1] !== 0 || parsedLoc[2] !== 0) setLocation(location)
                else getandsetCoarseLocation(setLocation)
            }
            else {
                getandsetCoarseLocation(setLocation)
            }
        }
        // This is the time elapsed to NOT continue searching
        const interval = setInterval(() => {
            setSearchHistory(prev => prev + 1)
            console.log(searchHistory)
        }, 1000)
        return () => { clearInterval(interval) }
    }, [])
    useEffect(() => {
        if (searchContent.length > 0) {
            searchButton.width.value = withSpring(40)
            searchButton.opacity.value = withSpring(1)
        } else {
            searchButton.width.value = withSpring(0)
            searchButton.opacity.value = withSpring(0)
        }

        // the real search function
        if (searchContent.length > 2 && searchHistory > 1) {
            const res = async () => await search({
                latitude: location[0],
                longitude: location[1],
                query: searchContent
            }).then(result => {
                setSearchResult(result)
                console.log(result)
            })
            res()
        }

    }, [searchContent])
    useEffect(() => {
        setSearchHistory(0)
    }, [searchContent])
    return (
        <SafeAreaView>
            <View style={css.container}>
                <Animated.View style={[css.header, searchBarProperty]}>
                    <TextInput value={searchContent} onChangeText={setSearchContent} style={[css.textInput,]} placeholder='Search' />
                    <Animated.View style={[searchButton]}>
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