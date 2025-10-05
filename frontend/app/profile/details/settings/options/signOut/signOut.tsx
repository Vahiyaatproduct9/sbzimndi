import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import css from './signOut.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../../../../components/message/message';
import { useNavigation } from '@react-navigation/native';
const SignOut = ({ route }: { route: any }) => {
  const { setActiveTab } = route.params;
  const navigation = useNavigation();
  const sign_out = async () => {
    try {
      setMessage('Logged Out!');
      setTimeout(() => {
        setActiveTab('home');
      }, 800);
      await AsyncStorage.clear();
    } catch (e) {
      setMessage(`${e}`);
    }
  };
  const [message, setMessage] = useState<string>('');
  return (
    <View style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      <Text style={css.head}>Are you Sure?</Text>
      <View style={css.body}>
        <Pressable style={css.button} onPress={sign_out}>
          <Text style={css.buttonText}>Yes</Text>
        </Pressable>
        <Pressable onPress={() => navigation.goBack()} style={css.button}>
          <Text style={css.buttonText}>No</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignOut;
