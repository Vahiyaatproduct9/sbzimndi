import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import feedback from '../../../../../../api/feedback';
import css from './feedback.css';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Switch from '../../../../../components/switch/switch';
import { useProfileStore } from '../../../../../store/useProfileStore';
import { useNavigation } from '@react-navigation/native';
import Message from '../../../../../components/message/message';
const Feedback = () => {
  const navigation = useNavigation()
  const access_token = useProfileStore(s => s.access_token);
  const [rate, setRate] = useState<number>(0);
  const [isAnonymous, setAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null)
  const submit = async () => {
    setLoading(true)
    console.log('Submitting')
    const { message: fetchMessage, success } = await feedback({
      body: content,
      access_token: !isAnonymous ? access_token || '' : null,
      stars: rate,
    });
    setMessage(fetchMessage || '')
    if (success) {
      setTimeout(() => {
        navigation.goBack()
      }, 2000)
    } else setLoading(false)
    setLoading(null)
  };
  const stars = () =>
    Array(5)
      .fill(null)
      .map((_, i) => (
        <Pressable key={i} onPress={() => setRate(i + 1)}>
          <AntDesign
            name="star"
            style={[css.star, rate >= i + 1 && css.starPressed]}
          />
        </Pressable>
      ));
  //   useEffect(() => {
  //     console.log(rate);
  //   }, [rate]);
  return (
    <View style={css.container}>
      <Message content={message} state={setMessage} time={3} />
      <View style={css.head}>
        <Text style={css.headingText}>Drop us your review!</Text>
      </View>
      <View style={css.starContainer}>{stars()}</View>
      <View style={css.textContainer}>
        {rate >= 1 && (
          <TextInput
            multiline
            placeholder="Anything Extra?"
            style={css.textInput}
            onChangeText={setContent}
            placeholderTextColor={'#888'}
          />
        )}
      </View>
      <View style={[css.footer, { opacity: rate >= 1 ? 1 : 0.4 }]}>
        <View style={css.footerContainer}>
          <Text style={css.footerText}>Send Anonymously</Text>
          <Switch pressedState={setAnonymous} value={isAnonymous} />
        </View>
        <Pressable disabled={rate === 0} style={[css.submitContainer]}
          onPress={submit}>
          <Text style={css.submitText}>{loading === false ? 'Try again?' :
            loading === true ? 'Submitting' : 'Submit'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Feedback;
