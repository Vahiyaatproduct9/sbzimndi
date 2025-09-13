import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './uploadDocuments.css';
import imagePicker from '../../functions/imagePicker';
import Message from '../../components/message/message';
import { signup } from '../../../api/signUp';
import {
  getAccountNumber,
  getEmail,
  getIfsc,
  getLocation,
  getName,
  getPassword,
  getPhone,
} from '../../functions/getLocalInfo';
const image = require('../../../assets/images/sky.png');

const UploadDocuments = () => {
  const [aadharCard, setAadharCard] = useState<string | null>(null);
  const [panCard, setPanCard] = useState<string | null>(null);
  const [bankProof, setBankProof] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [pressed, setPressed] = useState<boolean>(false);
  const uploadImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    name: string,
  ) => {
    const uri = await imagePicker({
      setPhoto: setImage,
      setMess: setMessage,
      name,
    });
    console.log('uri', uri);
  };
  useEffect(() => {
    const panRegex = /^[a-zA-z]{5}\d{4}[a-zA-Z]{1}$/;
    if (panNumber && !panRegex.test(panNumber)) {
      setMessage('Invalid PAN number');
    } else setMessage('');
  }, [panNumber]);
  useEffect(() => {
    console.log({ aadharCard, panCard, bankProof });
  }, [aadharCard, panCard, bankProof]);
  const handleSubmit = async () => {
    if (aadharCard && panNumber.length >= 10 && panCard && bankProof) {
      const res = await signup({
        name: await getName(),
        email: await getEmail(),
        password: await getPassword(),
        phone: await getPhone(),
        location: await getLocation(),
        ifsc: await getIfsc(),
        accountNumber: await getAccountNumber(),
        pan_number: panNumber,
        aadhar_uri: aadharCard,
        bank_proof_uri: bankProof,
        pan_uri: panCard,
      });
      if (res) setMessage('Sign UP Successfully!');
    }
  };
  useEffect(() => {
    (async () => console.log(await getLocation()))();
  }, []);
  return (
    <View style={css.container}>
      <Message content={message} state={setMessage} time={3} />
      <Text style={css.head}>Upload Documents</Text>
      <ScrollView style={css.scrollView}>
        <View style={css.photoContainer}>
          {aadharCard && (
            <Image source={{ uri: aadharCard }} style={css.Image} />
          )}
          <Pressable
            onPress={() => uploadImage(setAadharCard, 'aadhar_card')}
            style={css.inputField}
          >
            <Text style={css.label}>Aadhar Card</Text>
          </Pressable>
        </View>
        <View style={css.photoContainer}>
          {panCard && <Image source={{ uri: panCard }} style={css.Image} />}
          {panCard && (
            <TextInput
              placeholder="PAN number"
              value={panNumber}
              onChangeText={setPanNumber}
              style={css.textField}
              placeholderTextColor={'#888'}
            />
          )}
          <Pressable
            onPress={() => uploadImage(setPanCard, 'pan_card')}
            style={css.inputField}
          >
            <Text style={css.label}>PAN Card</Text>
          </Pressable>
        </View>
        <View style={css.photoContainer}>
          {bankProof && <Image source={{ uri: bankProof }} style={css.Image} />}
          <Pressable
            onPress={() => uploadImage(setBankProof, 'bank_proof')}
            style={css.inputField}
          >
            <Text style={css.label}>Bank Proof</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={css.footer}>
        <Pressable
          style={css.button}
          onPress={handleSubmit}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          disabled={
            loading === true ||
            pressed === true ||
            !aadharCard ||
            !panCard ||
            !bankProof ||
            panNumber.length < 10 ||
            message !== ''
          }
        >
          <Text style={css.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UploadDocuments;
