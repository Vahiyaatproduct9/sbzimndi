import { View, Text, SafeAreaView, TextInput, Pressable, useWindowDimensions, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import css from './css.ts'
import Feather from 'react-native-vector-icons/Feather'
import Animated, { withSpring, useSharedValue } from 'react-native-reanimated'
import search from '../../api/search.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getandsetCoarseLocation } from '../../api/getLocation.ts'
import data from './data.ts'
import MtoKm from '../functions/meterstokm.ts'
const photo = require('../../assets/images/switzerland.jpg')
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
            const localloc = await AsyncStorage.getItem('location')
            console.log(localloc)
            if (typeof localloc === 'string' && localloc.length > 0) {
                const parsedLoc = JSON.parse(localloc)
                setLocation(parsedLoc)
            }
            else {
                getandsetCoarseLocation(setLocation)
            }
        }
        setLoc()
        // This is the time elapsed to NOT continue searching
        const interval = setInterval(() => {
            setSearchHistory(prev => prev + 1)
        }, 1000)
        return () => { clearInterval(interval) }
    }, [])
    useEffect(() => {
        console.log(searchHistory)
    }, [searchHistory])
    useEffect(() => {
        if (searchContent.length > 0) {
            searchButton.width.value = withSpring(40)
            searchButton.opacity.value = withSpring(1)
        } else {
            searchButton.width.value = withSpring(0)
            searchButton.opacity.value = withSpring(0)
        }

    }, [searchContent])
    useEffect(() => {
        setSearchHistory(0)
        setSearchResult(null)
        console.log('location ->', location)
    }, [searchContent])
    useEffect(() => {
        // the real search function
        const timer = setTimeout(() => {
            if (searchContent.length > 2) {
                const res = async () => await search({
                    latitude: location[0],
                    longitude: location[1],
                    query: searchContent
                }).then(result => {
                    setSearchResult(result)
                    console.log("searchResult -> ", result)
                })
                res()
            }
            console.log(searchResult)
        }, 800)
        return () => { clearTimeout(timer) }
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
                    {/* Hello Everyone I hope everyones doing fine!! */}
                </Animated.View>
                <ScrollView style={css.body}>
                    {(searchResult && Array.isArray(searchResult.result)) ? searchResult.result.map(item => {
                        return (<View style={css.block}>
                            <Image source={{ uri: item.item.image_url }} style={css.blockImage} />
                            <View style={css.blockInfo}>
                                <View style={css.blockInfoHead}>
                                    <Text style={css.blockText}>{item.item.name}</Text>
                                </View>
                                <View style={css.blockInfoInfo}>
                                    <Text style={css.blockText}>${item.item.price}</Text>
                                    <Text style={css.blockText}>{item.item.expiry_date}</Text>
                                    <Text style={css.blockText}>{MtoKm(item.item.distance_meters)}</Text>
                                </View>
                            </View>
                        </View>)
                    }) : null}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Search