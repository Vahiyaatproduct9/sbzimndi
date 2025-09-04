import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import {
    Keyboard, Platform, Pressable, Text, TextInput,
    TouchableWithoutFeedback, View, Image, KeyboardAvoidingView, ScrollView,
} from 'react-native'
import handleSubmit from '../functions/handleAddItem.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import css from './css.ts'
import Message from '../components/message/message.tsx'
import checkUser from '../../api/checkUser.ts'
import imagePicker from '../functions/imagePicker.ts'
const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
type activeTab = 'home' | 'search' | 'add' | 'profile'
interface prop {
    setActiveTab: React.Dispatch<React.SetStateAction<activeTab>>
}
export default ({ setActiveTab }: prop) => {
    type focused = 'name' | 'quantity' | 'photo' | 'price' | 'date' | 'desc' | null
    const [date, setDate] = useState<Date>(new Date());
    const [focus, setFocus] = useState<focused>(null)
    const [photo, setPhoto] = useState<any | null>(null)
    const [pressed, setPressed] = useState<boolean>(false)
    const [show, setShow] = useState(false);
    const [mess, setMess] = useState<string>('')
    const [showNote, setShowNote] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [location, setLocation] = useState<number[] | null>(null)
    const [posted, setPosted] = useState<boolean | null | ''>('')
    // const [loading, setLoading] = useState<boolean | null | 'uploading'>(null)
    const changeDate = (e: any, date?: Date) => {
        setShow(Platform.OS === 'ios')
        if (date) setDate(date)
    }
    useEffect(() => {
        const checkandValidateUser = async () => {
            const access_token = await AsyncStorage.getItem('access_token')
            const refresh_token = await AsyncStorage.getItem('refresh_token')
            if (access_token && refresh_token) {
                const res = await checkUser({
                    access_token,
                    refresh_token
                })
                await AsyncStorage.setItem('access_token', res.access_token)
                await AsyncStorage.setItem('refresh_token', res.refresh_token)

            } else setMess('Please Login to Upload Post!')
        }
        checkandValidateUser()
    }, [])
    const pickImage = () => {
        return imagePicker({ setPhoto, setMess })
    }
    useEffect(() => {
        if (posted) {
            setMess('Posted!')
            setTimeout(() => {
                setActiveTab('home')
            }, 2000)
        }
    }, [posted])


    useEffect(() => {
        console.log(photo)
    }, [photo])
    useEffect(() => console.log('location from addItem --->', location), [location])

    useEffect(() => {
        if (new Date(date).getTime() <= new Date().getTime()) {
            setShowNote('Expiry date has to be atleast 1 day from today.')
        } else {
            setShowNote('')
        }
    }, [date])
    useEffect(() => {
        if (price.length > 60) {
            setMess('Stop Breaking my App 🙏🏻')
        }
        if (price.length > 5) {
            setPrice(price.slice(0, 5))
        }
        else {
            try {
                if (price.length > 0) {
                    for (const num of price) {
                        if (!numList.includes(num)) {
                            setPrice(price.slice(0, -1))
                        }
                    }
                    if (parseInt(price) > 100) {
                        setShowNote('Careful, High Prices might not attract Customers.')
                    } else {
                        setShowNote('')
                    }
                }
            }
            catch (e) {
                setShowNote(`Invalid Number... ${e}`)
            }
        }
    }, [price])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <Message content={mess} state={setMess} time={3} />
                <ScrollView style={[css.container]}
                    keyboardShouldPersistTaps="handled">

                    <Text style={css.header}>Post Item</Text>
                    <View style={css.body}>
                        <Pressable style={[css.photo]} onPress={pickImage}>
                            <View style={[css.photoView]}>
                                {photo ? (
                                    <Image style={css.uploadedPhoto} source={{ uri: photo }} />
                                ) : (
                                    <>
                                        <Ionicons name='add' size={32} color={css.container.color} />
                                        <Text style={css.photoTxt}>
                                            Photo</Text>
                                    </>
                                )}
                            </View>
                        </Pressable>
                        <View style={[css.content]}>
                            <View style={[css.contentSection]}>

                                <Text style={css.contentName}>
                                    Product Name:
                                </Text>
                                <TextInput placeholder='Name'
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setFocus('name')}
                                    onBlur={() => setFocus(null)}
                                    placeholderTextColor={'rgba(255,255,255,0.4)'}
                                    style={[css.nameInput, focus === 'name' && css.focused2]} />
                            </View>
                            <View style={[css.contentSection]}>

                                <Text style={css.contentName}>
                                    Quantity:
                                </Text>
                                <TextInput placeholder='1kg'
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    onFocus={() => setFocus('quantity')}
                                    onBlur={() => setFocus(null)}
                                    placeholderTextColor={'rgba(255,255,255,0.4)'}
                                    style={[css.nameInput, focus === 'quantity' && css.focused2]} />
                            </View>
                            <View style={css.contentSectionHorizontal}>
                                <View style={[css.contentSection, { flex: 1 }]}>
                                    <Text style={css.contentName}>
                                        Price:
                                    </Text>
                                    <TextInput
                                        value={price}
                                        onChangeText={setPrice}
                                        onFocus={() => setFocus('price')}
                                        onBlur={() => setFocus(null)}
                                        keyboardType='number-pad' placeholder='Price' placeholderTextColor={'rgba(255,255,255,0.4)'} style={[css.nameInput, focus === 'price' && css.focused2, { textAlign: 'center' }]} />
                                </View>
                                <View style={[css.contentSection, { flex: 1 }]}>
                                    <Text style={css.contentName}>
                                        Expiry Date:
                                    </Text>
                                    <Pressable onPress={() => setShow(true)}
                                        onFocus={() => setFocus('date')}
                                        onBlur={() => setFocus(null)}
                                        style={[css.dateBtn, focus === 'date' && css.focused2]}>
                                        <Text style={{ color: 'white', textAlign: 'center' }}>{date.toLocaleDateString()} </Text>
                                    </Pressable>
                                    {show && (<DateTimePicker
                                        value={date}
                                        mode="date" // can be 'date', 'time', or 'datetime'
                                        display="calendar"
                                        onChange={changeDate}
                                    />)}
                                </View>
                            </View>
                        </View>
                        {showNote.length > 0 && (
                            <View style={css.note}>
                                <Text style={css.noteTxt}>Note: {showNote}</Text>
                            </View>)}

                        <View style={[css.contentSection]}>
                            <Text style={css.contentName}>
                                Description:
                            </Text>
                            <TextInput
                                value={desc}
                                onChangeText={setDesc}
                                placeholder='Describe the Product here...'
                                placeholderTextColor={'rgba(255,255,255,0.4)'}
                                style={[css.nameInput, { height: 150 },
                                focus === 'desc' && css.focused2]}
                                multiline
                                onFocus={() => setFocus('desc')}
                                onBlur={() => setFocus(null)}
                                numberOfLines={10}

                            />
                        </View>
                        <View style={css.buttonView}>
                            <Pressable style={[css.button, pressed && { transform: 'scale(0.98)' }]}
                                onPress={() => {
                                    handleSubmit({
                                        setPosted, photo, name, date, quantity, location, price, desc, setLocation, setMess, setActiveTab
                                    })
                                }}
                                onPressIn={() => setPressed(true)}
                                onPressOut={() => setPressed(false)}
                                disabled={posted === null ? true : false}
                            >
                                <Text style={css.buttonTxt}>
                                    {posted === null ? 'Posting..' : (
                                        posted === false ? 'Try Again?' :
                                            (posted === true ? 'Posted!' : 'Post')
                                    )}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}