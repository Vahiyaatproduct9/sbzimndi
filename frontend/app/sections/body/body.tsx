import { View, Text, StyleSheet, Image, FlatList, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Theme from '../../../colors/ColorScheme.ts'
import Card from '../../components/Card/card.tsx'
import { expiringItems } from '../../../sample/sampledata.ts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Animated, { withSpring, useSharedValue, withDelay } from 'react-native-reanimated'

const Body = () => {
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
        <Animated.View style={[css.container, containerProperty]}>
            <Text style={css.head}>Most in Demand</Text>
            <View style={css.slider}>
                <FlatList
                    data={expiringItems}
                    renderItem={({ item }) =>
                    (<Card style={css.card}>
                        <Image style={css.Image} source={item.image} />
                        <View style={css.info}>
                            <View style={css.infoinfo}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, color: Theme.text }}>{item.name}</Text>
                                    <Text style={{ color: Theme.text }}>{Date.now()}</Text>
                                    <Text style={{ color: Theme.text }}>₹{item.price}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: Theme.text }}>4.7</Text>
                                    <AntDesign name='star' size={32} color='gold' />
                                </View>
                            </View>
                            <Pressable style={css.button}>
                                <Text style={{ fontSize: 18, fontWeight: 700, color: Theme.text }}>Buy</Text>
                            </Pressable>
                        </View>
                    </Card>)
                    }
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={css.card.width * 0.8 + 20} // Card width + spacing
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                    }}
                />
            </View>
        </Animated.View>
    )
}
const css = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    slider: {
        flexDirection: 'row'
    },
    card: {
        height: '100%',
        width: 190,
        flexDirection: 'column',
    },
    head: {
        color: Theme.text,
        fontSize: 23,
        fontWeight: '700'
    },
    Image: {
        backgroundColor: 'red',
        borderRadius: 10,
        height: 150,
        aspectRatio: '1'
    },
    info: {
    },
    infoinfo: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: Theme.extra,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    }
})

export default Body