import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import css from './mainPage.css.ts'
import navigation from './navigation.ts'
const MainPage = ({ navigation: nvgtn }: any) => {
    const [pressed, setPressed] = useState<string>('');
    return (
        <ScrollView style={css.container}>
            <View style={css.box}>
                {navigation.map(
                    (item, i) =>
                    (<View key={i} style={css.block}>
                        <Pressable
                            onPress={() => nvgtn.navigate(`${item.page}`)}
                            onPressIn={() => setPressed(`${item.page}`)}
                            onPressOut={() => setPressed('')}
                            style={[css.press, pressed === item.page ? css.blockPressed : null]}>
                            <View>
                                <Text style={css.optionText}>{item.name}</Text>
                            </View>
                        </Pressable>
                    </View>)
                )}
                {/* Mapping the above blocks from the navigation.ts file */}

            </View>
        </ScrollView>
    )
}

export default MainPage