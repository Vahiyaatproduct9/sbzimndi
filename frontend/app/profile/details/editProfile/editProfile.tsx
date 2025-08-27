import { View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import css from './editProfile.style.ts'
// import RNP from 'react-native-picker-select'
import spiritAnimals from '../../../data/spiritAnimals.ts'
import { Picker } from '@react-native-picker/picker'
import { getSpirit, saveSpirit } from '../../../functions/toggleSpiritAnimal.ts'
import Cbutton from '../../../components/button/cbutton.tsx'
import Switch from '../../../components/switch/switch.tsx'
const image = require('../../../../assets/images/sky.png')
import { launchImageLibrary } from 'react-native-image-picker'
import { getBio, getName, setName as sn, setBio as sb } from '../../../functions/getLocalInfo.ts'

const EditProfile = ({ navigation, route }: any) => {
    // const { change, setchange }: { change: boolean, setchange: React.Dispatch<SetStateAction<boolean>> } = route.params;
    const [spiritAnimal, setSpiritAnimal] = useState<string>('')
    const [pressed, setPressed] = useState<boolean>(false)
    const [toggle, setToggle] = useState<boolean>(false)
    const [photo, setPhoto] = useState<any | null>(null)
    const [name, setName] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const renderItem = (list: { label: string, value: string }[]) => (
        list.map((item, index) => {
            return <Picker.Item key={index.toString()} label={item.label} value={item.value} />
        })
    )
    const pickImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 1 },
            (res) => {
                if (!res.didCancel && !res.errorCode) {
                    setPhoto(typeof res.assets !== 'undefined' && res.assets[0].uri)
                }
            }
        )
    }

    const handleSubmit = async () => {
        await saveSpirit(spiritAnimal)
            .then(() => {
                const f = async () => await sn(name)
                f().then(() => {
                    const f = async () => await sb(bio)
                        .then(() => navigation.goBack())
                    f()
                })
            })
    }
    useEffect(() => {
        const d = async () => {
            await getName().then(name => name && setName(name))
            await getBio().then(bio => bio && setBio(bio))
            await getSpirit().then(spirit => spirit && setSpiritAnimal(spirit))
        }
        d()
    }, [])
    return (
        <ScrollView style={css.container} >
            <View style={css.box}>
                <Image source={photo ? { uri: photo } : image} style={css.image} />
                <Pressable style={css.changeBtn} onPress={pickImage}>
                    <Text style={css.text}>Change Picture</Text>
                </Pressable>
                <View style={css.TextBox}>
                    <Text style={[css.text, css.label]}>Name: {toggle}</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder={'Ramesh Mahata'}
                        placeholderTextColor={'rgba(255,255,255,0.3)'}
                        style={css.textInput} />
                </View>
                <View style={css.TextBox}>
                    <Text style={[css.text, css.label]}>Spirit Animal:</Text>
                    <Picker
                        itemStyle={{}}
                        mode='dropdown'
                        collapsable
                        selectedValue={spiritAnimal}
                        selectionColor={'green'}
                        style={css.picker}
                        onValueChange={(animal) => setSpiritAnimal(animal)}
                    >
                        {renderItem(spiritAnimals)}
                    </Picker>
                </View>
                <View style={[css.TextBox, css.switch]}>
                    <Text style={[css.text, css.label]}>User Type:</Text>
                    <Text style={[css.text, css.label]}>Buyer</Text>
                </View>
                <View style={[css.TextBox, css.switch]}>
                    <Text style={[css.text, css.label]}>Force Seller</Text>
                    <Switch value={toggle} pressedState={setToggle} />
                </View>
                <View style={css.TextBox}>
                    <Text style={[css.text, css.label]}>Bio:</Text>
                    <TextInput
                        value={bio}
                        onChangeText={setBio}
                        placeholder={'New to SbziMndi'}
                        placeholderTextColor={'rgba(255,255,255,0.3)'}
                        style={[css.textInput, css.bio]}
                        multiline
                        numberOfLines={5}
                        maxLength={300}
                        scrollEnabled
                    />
                </View>
                <Cbutton
                    containerStyle={css.saveBtn}
                    text='Save'
                    pressedState={setPressed}
                    pressed={pressed}
                    onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}


export default EditProfile