import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './upi.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signup } from '../../../api/signUp';
import Message from '../../components/message/message';
import validUPI, { normalizeUpi } from '../../functions/validUPI';
import { useNavigation } from '@react-navigation/native';

const Upi = () => {
  const navigation = useNavigation();
  const [fullName, setfullName] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [reUpi, setReUpi] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');
  const [pressed, setPressed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const handleSubmit = async () => {
    setLoading(true);
    if (normalizeUpi(upiId) !== normalizeUpi(reUpi)) {
      setMessage('UPI Id do not match :(');
      return;
    }
    const res = await AsyncStorage.getItem('signupInfo');
    const allInfo = await JSON.parse(res || '');
    const info = { fullName, upiId };
    const newInfo = { ...allInfo, ...info };
    await AsyncStorage.setItem('signupInfo', JSON.stringify(newInfo));
    const { success, message: msg } = await signup(newInfo);
    if (success) navigation.navigate('otp' as never);
    else setMessage(msg);
    setLoading(false);
  };
  useEffect(() => {
    if ((reUpi.length > 0 || upiId.length > 0) && !validUPI(upiId)) {
      setNote('Invalid UPI Id.');
      if (normalizeUpi(upiId) !== normalizeUpi(reUpi)) {
        setNote('UPI mismatch! Please check before proceeding.');
      }
    } else {
      setNote('');
    }
  }, [upiId, reUpi]);
  useEffect(() => {
    if (
      !validUPI(upiId) ||
      loading ||
      note.length !== 0 ||
      fullName.length <= 3
    )
      setDisabled(true);
    else setDisabled(false);
  }, [loading, fullName, note, upiId]);
  return (
    <View style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      <View style={css.head}>
        <Text style={css.headText}>UPI Verification</Text>
      </View>
      <ScrollView style={css.body}>
        <View style={css.inputField}>
          <Text style={css.label}>Full Name</Text>
          <TextInput
            style={css.textInput}
            value={fullName}
            placeholder="Ramesh Mahata"
            placeholderTextColor={'#888'}
            onChangeText={setfullName}
          />
        </View>
        <View style={css.inputField}>
          <Text style={css.label}>UPI Id</Text>
          <TextInput
            style={css.textInput}
            value={upiId}
            placeholder="987654321@axl"
            placeholderTextColor={'#888'}
            onChangeText={setUpiId}
          />
        </View>
        <View style={css.inputField}>
          <Text style={css.label}>Confirm UPI Id</Text>
          <TextInput
            style={css.textInput}
            value={reUpi}
            placeholder="987654321@axl"
            placeholderTextColor={'#888'}
            onChangeText={setReUpi}
          />
        </View>
        {note.length > 0 && (
          <View style={css.note}>
            <Text style={css.noteText}>{note}</Text>
          </View>
        )}
        <View style={css.note}>
          <Text style={[css.noteText, { fontWeight: 600 }]}>Note:</Text>
          <Text style={css.noteText}>
            Please make sure your Name & UPI Id is correct.
          </Text>
        </View>
      </ScrollView>
      <View style={css.footer}>
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={handleSubmit}
          style={[css.button, pressed && css.pressed, disabled && css.disabled]}
          disabled={disabled}
        >
          <Text style={css.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Upi;
