import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './messages.css';
import conversation from '../../../../../api/conversation';
import Message from '../../../../components/message/message';

const Messages = ({ route }: any) => {
  let conversation_id: string | null | undefined = null;
  const parameter = route.params;
  if (
    parameter?.conversation_id &&
    typeof parameter.conversation_id === 'string'
  )
    conversation_id = parameter.conversation_id;
  const [list, setList] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  // fetching all Conversations
  useEffect(() => {
    (async () => {
      const {
        success,
        data,
        error,
        message: fetchMessage,
      } = await conversation.list();

      if (success) {
        setList(data);
        console.log('conversations -> ', data);
      } else setMessage(fetchMessage || error);
    })();
  }, []);
  return (
    <ScrollView style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      {conversation_id && <Text>{`${conversation_id}`}</Text>}
      <View style={css.block}>
        <Image
          style={css.profilePicture}
          source={require('../../../../../assets/images/sky.png')}
        />
        <View style={css.content}>
          <Text style={css.name}>Name</Text>
          <Text style={css.lastMessage}>Hello Hows it going?</Text>
        </View>
        <View style={css.info}>
          <Text style={css.time}>2 mins ago</Text>
        </View>
      </View>
      <View style={css.block}>
        <Image
          style={css.profilePicture}
          source={require('../../../../../assets/images/sky.png')}
        />
        <View style={css.content}>
          <Text style={css.name}>Name</Text>
          <Text style={css.lastMessage}>Hello Hows it going?</Text>
        </View>
        <View style={css.info}>
          <Text style={css.time}>2 mins ago</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Messages;
