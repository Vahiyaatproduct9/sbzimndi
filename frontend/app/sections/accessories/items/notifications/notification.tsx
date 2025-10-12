import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './notification.css';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../../../../colors/ColorScheme';
import { notification, tabs } from '../../../../../types/types';
import getNotification from '../../../../../api/getNotification';
import deleteNotification from '../../../../../api/deleteNotification';
import Message from '../../../../components/message/message';
import { getRelativeTime } from '../../../../functions/getRelativeTime';

const Notifications = () => {
  const [list, setList] = useState<notification[] | null | undefined>(null);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    const fetch_notifications = async () => {
      const { data, error, success } = await getNotification();
      if (success === true && !error) {
        console.log('notifications set', data);
        setList(data);
      }
    };
    fetch_notifications();
  }, []);

  const delete_notification_and_fetch_again = async (
    notification_id: string,
  ) => {
    const res = await deleteNotification({ notification_id });
    if (!res?.success) {
      setMessage("Could't delete notification :(");
      return;
    }
    setList(prev =>
      prev?.filter(item => item.body.data.newRow.id !== notification_id),
    );
    const { data, success } = await getNotification();
    if (success) {
      setList(data);
    } else setMessage('Some Error Occured');
  };

  const blocks = () =>
    list && list.length > 0 ? (
      list.map(notification => (
        <View key={notification.id} style={css.notification_block}>
          {/* <View>
            <Ionicons
              style={css.notification_icon}
              name="notifications"
              size={28}
              color={theme.text}
            />
          </View> */}
          <Text style={css.notification_content}>
            {notification.body.body ||
              'Some Error Occured while loading this notification :('}
            {getRelativeTime(notification.created_at)}
          </Text>
          <View style={css.option_container}>
            <Pressable
              onPress={() =>
                delete_notification_and_fetch_again(notification.id)
              }
            >
              <Feather
                style={css.option}
                name="trash-2"
                size={28}
                color={theme.text}
              />
            </Pressable>
          </View>
        </View>
      ))
    ) : list?.length === 0 ? (
      <Text style={css.noNotification}>You're All caught up.</Text>
    ) : (
      <Text style={css.noNotification}>Loading...</Text>
    );
  return (
    <ScrollView style={css.container}>
      <Message content={message} state={setMessage} time={3} />
      {blocks()}
    </ScrollView>
  );
};

export default Notifications;
