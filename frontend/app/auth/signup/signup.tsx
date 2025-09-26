import { View, Text, TextInput, Image, Pressable, Switch } from 'react-native';
import { getAndSetLocation } from '../../../api/getLocation.ts';
import React, { useEffect } from 'react';
import css from '../style/css.ts';
import theme from '../../../colors/ColorScheme.ts';
import { useState } from 'react';
import Message from '../../components/message/message.tsx';
const image = require('../../../assets/images/fruit.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import validateSignupInfo from '../../functions/validateSignupInfo.ts';

const SignUp = ({ setActivePage }: any) => {
  const nv = useNavigation();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  // const []
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repass, setRepass] = useState<string>('');
  const [lctnEnbld, setLctnEnbld] = useState<boolean>(false);
  const [reS, setRes] = useState<string>('');
  const [location, setLocation] = useState<Array<number>>([0, 0, 0]);
  const [pressed, setPressed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const run = async () => {
      await getAndSetLocation(setLocation, setRes);
    };
    if (lctnEnbld) run();
  }, [lctnEnbld]);
  useEffect(() => {
    const run = async () => {
      const res = await AsyncStorage.getItem('signupInfo');
      console.log(res);
      const response = JSON.parse(res ? res : '');
      if (response) {
        setName(response.name);
        setEmail(response.email);
        setPhone(response.phone);
        setRepass(response.repass);
        setPassword(response.password);
        setLctnEnbld(response.lctnEnbld);
        const loc = [
          response.location.lat,
          response.location.long,
          response.location.acc,
        ];
        setLocation(loc);
      }
    };
    run();
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    const info = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      repass,
      lctnEnbld,
      location: {
        long: location[0],
        lat: location[1],
        acc: location[2],
      },
    };
    if ((await validateSignupInfo(info)) === null) {
      await AsyncStorage.setItem('signupInfo', JSON.stringify(info));
    } else {
      setRes((await validateSignupInfo(info)) as string);
      setLoading(false);
      return;
    }
    setLoading(false);
    setActivePage('kyc');
  };
  return (
    <View style={css.container}>
      <Message content={reS} time={3} state={setRes} />
      <View style={css.header}>
        <Image style={css.Image} source={image} />
        <Text style={css.headerText}>SbziMndi</Text>
      </View>
      <View style={css.inputContainer}>
        <Text style={css.BtnTxt}>Name:</Text>
        <TextInput
          style={css.inputText}
          placeholder="Ramesh Mahata"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={css.inputContainer}>
        <Text style={css.BtnTxt}>Email:</Text>
        <TextInput
          style={css.inputText}
          placeholder="someone@gmail.com"
          value={email.trim()}
          onChangeText={setEmail}
        />
      </View>
      <View style={css.inputContainer}>
        <Text style={css.BtnTxt}>Phone:</Text>
        <TextInput
          style={css.inputText}
          keyboardType="numeric"
          placeholder="9029938400"
          value={phone.trim()}
          onChangeText={setPhone}
        />
      </View>
      <View style={css.inputContainer}>
        <Text style={css.BtnTxt}>Password:</Text>
        <TextInput
          style={css.inputText}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={css.inputContainer}>
        <Text style={css.BtnTxt}>Confirm Password:</Text>
        <TextInput
          style={css.inputText}
          placeholder="••••••••"
          secureTextEntry
          value={repass}
          onChangeText={setRepass}
        />
      </View>
      <View style={[css.inputContainer, css.locationContainer]}>
        <Switch
          trackColor={{ false: '#767577', true: theme.extra }}
          thumbColor={lctnEnbld ? theme.tint : '#f4f3f4'}
          onValueChange={() => {
            setLctnEnbld(prev => !prev);
          }} // This function updates the state
          value={lctnEnbld} // This controls the current state of the switch
        />
        <Text style={css.BtnTxt}>Enable Location</Text>
      </View>
      <Pressable
        style={[css.button, pressed ? css.buttonPressed : css.buttonUnpressed]}
        onPressIn={() => setPressed(true)}
        disabled={loading === true && true}
        onPressOut={() => setPressed(false)}
        onPress={handleSubmit}
      >
        <Text style={css.BtnTxt}>Next</Text>
      </Pressable>
      <View>
        <Text style={css.footer}>
          <Pressable
            style={{ justifyContent: 'center' }}
            onPress={() => {
              nv.navigate('signin' as never);
            }}
          >
            <Text style={{ fontWeight: '600', color: 'orange' }}>
              Sign In{'  '}
            </Text>
          </Pressable>
          Instead?
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
