import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './text.css';
import Texts from '../../../../../components/textMessage/texts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Animated, { withTiming, useSharedValue } from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import conversation from '../../../../../../api/conversation';
import { Message } from '../../../../../../types/types';
import {
  getChatLogs,
  saveChatLogs,
} from '../../../../../functions/getLocalInfo';
import MSGBubble from '../../../../../components/message/message';
import messageStream from '../../../../../../api/messageStream';

const DirectMessage = ({ route }: any) => {
  const navigation = useNavigation();
  const { conversation_id, profile, my_id } = route.params;
  useEffect(() => {
    if (!conversation_id) {
      navigation.goBack();
    }
  }, [conversation_id, navigation]);
  const [isMenuOpen, setMenu] = useState<boolean>(false);
  const [textMessage, setTextMessage] = useState<string>('');
  const [chatLogs, setChatLogs] = useState<Message[] | null | undefined>(null);
  const [message, setMessage] = useState<string>('');
  const paddingTop = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const opacity = useSharedValue(0);
  const sendWidth = useSharedValue(0);
  const sendOpacity = useSharedValue(0);

  const MenuValue = React.useMemo(() => {
    return { paddingTop, borderRadius };
  }, [paddingTop, borderRadius]);
  let OptionValue = React.useMemo(() => {
    return { opacity };
  }, [opacity]);
  let sendValue = React.useMemo(() => {
    return { width: sendWidth, opacity: sendOpacity };
  }, [sendWidth, sendOpacity]);
  useEffect(() => {
    const fetch_and_save_chat_logs = async () => {
      //fetching chats locally
      try {
        const local_chat_logs = await getChatLogs(conversation_id);
        // loading them in memory
        if (local_chat_logs) {
          setChatLogs(prev => {
            if (prev) return [...prev, ...local_chat_logs];
            else return [...local_chat_logs];
          });
        }
        const fetch_chat_logs = await conversation.get({
          user_id: my_id,
          conversation_id,
          last_message_at:
            chatLogs && chatLogs.length > 0
              ? chatLogs[chatLogs.length - 1]?.created_at
              : null,
        });
        if (fetch_chat_logs.success && fetch_chat_logs.data) {
          setChatLogs(prev => {
            if (prev) {
              if (fetch_chat_logs.data) {
                const existingIds = new Set(prev.map(m => m.id));
                const newOnes = fetch_chat_logs.data
                  .filter(m => !existingIds.has(m.id))
                  .sort(
                    (a, b) =>
                      parseInt(String(new Date(b.created_at)), 10) -
                      parseInt(String(new Date(a.created_at)), 10),
                  );
                return [...prev, ...newOnes];
              } else return [...prev];
            } else if (fetch_chat_logs.data) return [...fetch_chat_logs.data];
            else return null;
          });
        }
      } catch (e) {
        console.log('e text.tsx:', e);
        setMessage('Some Error Occured.');
      }
    };
    fetch_and_save_chat_logs();
    // (async () => await AsyncStorage.removeItem(`${conversation_id}`))();
  }, [conversation_id, my_id]);

  useEffect(() => {
    const websocket = new messageStream({
      user_id: my_id,
      state: setChatLogs,
    });
    websocket.openConnection();
    return () => {
      websocket.closeConnection();
    };
  }, [my_id, conversation_id]);

  useEffect(() => {
    console.log('chat logs: ', chatLogs);
    (async () => await saveChatLogs(conversation_id, chatLogs))();
  }, [conversation_id, chatLogs]);

  const deleteChats = async () => {};
  const sendMessage = async () => {
    const res = await conversation.send({
      conversation_id,
      message: textMessage.trim(),
    });
    console.log('res from text.tsx: ', res);
    if (res.success) {
      setTextMessage('');
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      MenuValue.paddingTop.value = withTiming(140, { duration: 300 });
      MenuValue.borderRadius.value = withTiming(20, {
        duration: 300,
      });
      OptionValue.opacity.value = withTiming(1, { duration: 700 });
    } else {
      MenuValue.paddingTop.value = withTiming(10, { duration: 300 });
      MenuValue.borderRadius.value = withTiming(0, {
        duration: 300,
      });
      OptionValue.opacity.value = withTiming(0, { duration: 300 });
    }
  }, [MenuValue, OptionValue, isMenuOpen]);
  useEffect(() => {
    if (textMessage.trim().length > 0) {
      sendValue.opacity.value = withTiming(1, { duration: 300 });
      sendValue.width.value = 40;
    } else {
      sendValue.opacity.value = withTiming(0, { duration: 300 });
      sendValue.width.value = 0;
    }
  }, [sendValue, textMessage]);
  return (
    <View style={css.container}>
      <MSGBubble state={setMessage} content={message} time={3} />
      <Animated.View style={[css.titleBar, MenuValue]}>
        <Animated.View style={[css.titleHidden, OptionValue]}>
          <Image
            style={css.profilePicture}
            source={
              profile?.profile_picture
                ? { uri: profile?.profile_picture }
                : require('../../../../../../assets/images/sky.png')
            }
          />
          <View style={css.hiddenOptions}>
            <Pressable style={css.option} onPress={deleteChats}>
              <Octicons name="trash" size={28} style={css.icon} />
              <Text style={css.optionText}>Delete Chats</Text>
            </Pressable>
            {/* 
            PUT MORE OPTIONS HERE, LIKE ...
            <Pressable style={css.option}>
              <Octicons name="trash" size={28} style={css.icon} />
              <Text style={css.optionText}>Delete Chats</Text>
            </Pressable> */}
          </View>
        </Animated.View>
        <View style={css.titleView}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} style={css.icon} />
          </Pressable>
          <Text style={css.name}>{profile?.full_name || 'Unknown'}</Text>
          <View style={css.options}>
            <Pressable
              focusable
              onFocus={() => setMenu(true)}
              onBlur={() => setMenu(false)}
              onPress={() => setMenu(prev => !prev)}
            >
              {!isMenuOpen ? (
                <Ionicons name="menu" size={28} style={css.icon} />
              ) : (
                <AntDesign name="close" size={28} style={css.icon} />
              )}
            </Pressable>
          </View>
        </View>
      </Animated.View>
      <ScrollView>
        <Texts list={chatLogs || []} my_id={my_id} />
      </ScrollView>
      <View style={css.textArea}>
        <TextInput
          onChangeText={setTextMessage}
          value={textMessage}
          multiline
          style={css.textInput}
          placeholder="Enter your Message"
          placeholderTextColor={'#888'}
        />
        <Animated.View style={sendValue}>
          <Pressable style={css.sendIcon} onPress={sendMessage}>
            <Ionicons name="send" size={28} style={[css.icon]} />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default DirectMessage;
