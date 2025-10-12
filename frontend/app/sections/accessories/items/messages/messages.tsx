import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './messages.css';
import Message from '../../../../components/message/message';
import { User } from '../../../../../types/types';
import { useNavigation } from '@react-navigation/native';
import getContacts from '../../../../functions/getContacts';
interface enhancedUser extends User {
  last_message: string | null;
  last_message_at: string | null;
  conversation_id: string;
  my_id: string;
}
const Messages = ({ route }: any) => {
  const navigation = useNavigation();
  const parameter = route.params;
  if (typeof parameter?.conversation_id === 'string') {
    navigation.navigate('Text' as never, {
      conversation_id: parameter?.conversation_id,
    });
  }
  const [list, setList] = useState<enhancedUser[] | null>(null);
  const [message, setMessage] = useState<string>('');
  // fetching all Conversations
  useEffect(() => {
    (async () => getContacts({ setList, setMessage }))();
  }, []);
  const block = () =>
    list?.map(listItem => {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('Text', {
              conversation_id: listItem.conversation_id,
              profile: listItem,
              my_id: listItem.my_id,
            })
          }
          key={listItem.id}
          style={css.block}
        >
          <Image
            style={css.profilePicture}
            source={
              listItem?.profile_picture
                ? { uri: listItem.profile_picture }
                : require('../../../../../assets/images/sky.png')
            }
          />
          <View style={css.content}>
            <Text style={css.name}>{listItem?.full_name || '...'}</Text>
            <Text style={css.lastMessage}>
              {listItem?.last_message || '...'}
            </Text>
          </View>
          <View style={css.info}>
            <Text style={css.time}>{listItem?.last_message_at || '...'}</Text>
          </View>
        </Pressable>
      );
    });
  return (
    <ScrollView style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      {/* {conversation_id && <Text>{`${conversation_id}`}</Text>} */}
      {block()}
    </ScrollView>
  );
};

export default Messages;
