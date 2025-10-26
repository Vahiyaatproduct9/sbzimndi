import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './notifications.css';
import { useProfileStore } from '../../../../../store/useProfileStore';
import Switch from '../../../../../components/switch/switch';
import toggleNotification from '../../../../../../api/toggleNotification';
import Message from '../../../../../components/message/message';
const Notifications = () => {
  const [on, setOn] = useState<boolean>(true);
  const profile = useProfileStore(s => s.profile);
  const access_token = useProfileStore(s => s.access_token);
  const changeProfile = useProfileStore(s => s.changeProfile);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    console.log('RUnning useEffect', profile?.data?.notification_on);
    setOn(profile?.data?.notification_on ?? true);
  }, [profile?.data?.notification_on]);
  const turnNotification = async () => {
    if (!access_token) {
      setMessage('Some error occurred!');
      return;
    }

    const res = await toggleNotification({ enabled: !on, access_token });
    console.log(res);

    if (res.success) {
      changeProfile({ notification_on: !on });
    } else {
      setMessage(res.message ?? '');
    }
  };

  return (
    <View style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      <View style={css.block}>
        <Text style={css.text}>Enable Notifications</Text>
        <Switch value={on} pressedState={setOn} onPress={turnNotification} />
      </View>
    </View>
  );
};

export default Notifications;
