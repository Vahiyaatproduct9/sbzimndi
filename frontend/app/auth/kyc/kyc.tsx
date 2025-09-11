import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import React from 'react';
import css from './kyc.css';
import validateBankDetails from '../../functions/validateBankDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../components/message/message';
import { signup } from '../../../api/signUp';
import { useNavigation } from '@react-navigation/native';
import {
  setEmail,
  setName,
  setPhone,
  setIfsc as setifsc,
  setAccountNumber as setAN,
} from '../../functions/getLocalInfo';

const Kyc = () => {
  const navigation = useNavigation();
  const [ifsc, setIfsc] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [message, setMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean | null>(null);
  const [confirmAccountNumber, setConfirmAccountNumber] = React.useState('');
  function handleSubmit(submitDetails: boolean) {
    setLoading(true);
    const bankDetails = submitDetails
      ? {
          //for testing purposes
          ifsc: 'CBIN0280606',
          accountNumber: '123456789012',
          confirmAccountNumber: '123456789012',
        }
      : null;
    // Handle form submission logic here
    //Validate bank details
    const validate =
      bankDetails !== null ? validateBankDetails(bankDetails) : null;
    try {
      if (validate === null) {
        const signUpInfo = (async () => {
          const res = await AsyncStorage.getItem('signupInfo');
          return JSON.parse(res ? res : '');
        })();
        signUpInfo.then(async info => {
          const allInfo = { ...info, ...bankDetails };
          console.log({ allInfo });
          await AsyncStorage.setItem('signupInfo', JSON.stringify(allInfo));
          await setEmail(allInfo.email);
          await setName(allInfo.name);
          await setPhone(allInfo.phone);
          await setifsc(allInfo.ifsc || '');
          await setAN(allInfo.accountNumber || '');
          const signedUp = await signup(allInfo);
          if (signedUp) {
            setMessage('Signed up successfully! Please verify your email.');
            navigation.navigate('otp' as never);
          } else {
            setMessage('Error signing up. Please try again.');
          }
        });
      } else {
        //Show error message
        setMessage((validateBankDetails(bankDetails) as string) || '');
        return;
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      console.error('Error during signup:', error);
      setLoading(null);
    }
    setLoading(false);
  }
  return (
    <View style={css.container}>
      <Message content={message} state={setMessage} time={3} />
      <ScrollView style={css.scrollView}>
        <Text style={css.head}>Bank Details</Text>
        <View style={css.inputField}>
          <Text style={css.label}>IFSC Code</Text>
          <TextInput
            value={ifsc}
            onChangeText={setIfsc}
            placeholder="IFSC Code"
            placeholderTextColor={'#888'}
            style={css.input}
          />
        </View>
        <View style={css.inputField}>
          <Text style={css.label}>Account Number</Text>
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            inputMode="numeric"
            keyboardType="numeric"
            placeholder="Account Number"
            placeholderTextColor={'#888'}
            style={css.input}
          />
        </View>
        <View style={css.inputField}>
          <Text style={css.label}>Confirm Account Number</Text>
          <TextInput
            value={confirmAccountNumber}
            onChangeText={setConfirmAccountNumber}
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="Account Number"
            placeholderTextColor={'#888'}
            style={css.input}
          />
        </View>
      </ScrollView>
      <View style={css.footer}>
        <Pressable style={css.skip} onPress={() => handleSubmit(false)}>
          <Text style={css.buttonText}>Skip {'>>'}</Text>
        </Pressable>
        <Pressable
          disabled={loading === true}
          style={css.button}
          onPress={() => handleSubmit(true)}
        >
          <Text style={css.buttonText}>
            {loading === null
              ? 'Submit'
              : loading === true
              ? 'Submitting...'
              : 'Try Again?'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Kyc;
