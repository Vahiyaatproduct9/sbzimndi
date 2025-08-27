import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import Theme from '../../../colors/ColorScheme'
import Card from '../../components/Card/card'

type activeTab = 'home' | 'search' | 'add' | 'profile'
interface props {
    setActiveTab: React.Dispatch<SetStateAction<activeTab>>
}
const Hero = ({ setActiveTab }: props) => {
    const [pressed, SetPressed] = useState<boolean>(false)
    return (
        <Card style={{ width: '100%', flexDirection: 'row' }} innerStyle={{ flex: 1 }}>
            <Image style={css.image} source={require('../../../assets/images/fruit.png')} />
            <Text style={css.text}>Hello Userss!</Text>
            <Text style={css.text2}>Buy soon to be expired goods at low prices!</Text>
            <View style={css.BtnView}>
                <Pressable onPressIn={() => SetPressed(true)} onPressOut={() => SetPressed(false)}
                    onPress={() => { setActiveTab('search') }}
                    style={[css.Btn, pressed ? css.BtnPressed : css.BtnUnpressed]}>
                    <Text style={css.BtnTxt}>Explore</Text>
                </Pressable>
            </View>
        </Card>
    )
}
const css = StyleSheet.create({
    image: {
        position: 'absolute',
        right: 0 - 50,
        transform: 'rotateY(180deg)',
        height: 150,
        width: 150,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Barriecito-Regular',
        fontWeight: '600',
        color: 'white',
    },
    text2: {
        fontSize: 12,
        color: 'white',
    },
    BtnView: {
        marginTop: 40,
        padding: 0,
        height: 50,
        width: '100%',
        display: 'flex',
        justifyContent: "center"
    },
    Btn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        minWidth: 140,
        minHeight: 50,
        borderRadius: 50,
        padding: 10,
        backgroundColor: Theme.extra,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnUnpressed: {
        boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.6), 1px 1px 1px rgba(0,0,0,0.6)'
    },
    BtnPressed: {
        transform: 'translate(0, 2px)',
        boxShadow: '1px 1px 1px rgba(255,255,255,0.6), inset 1px 1px 1px rgba(0,0,0,0.6)'
    }
    , BtnTxt: {
        color: 'white',
        fontWeight: '700'
    }

})

export default Hero