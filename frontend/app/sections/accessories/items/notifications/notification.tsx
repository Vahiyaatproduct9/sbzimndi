import { View, Text, Pressable } from 'react-native';
import React from 'react';
import css from './notification.css';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../../../../colors/ColorScheme';

const Notifications = () => {
  return (
    <View style={css.container}>
      <View style={css.notification_block}>
        {/* <View>
          <Ionicons
            style={css.notification_icon}
            name="notifications"
            size={28}
            color={theme.text}
          />
        </View> */}
        <Text style={css.notification_content}>This is a New NOtification</Text>
        <View style={css.option_container}>
          <Pressable>
            <Feather
              style={css.option}
              name="trash-2"
              size={28}
              color={theme.text}
            />
          </Pressable>
        </View>
      </View>
      <View style={css.notification_block}>
        {/* <View>
          <Ionicons
            style={css.notification_icon}
            name="notifications"
            size={28}
            color={theme.text}
          />
        </View> */}
        <Text style={css.notification_content}>This is a New NOtification</Text>
        <View style={css.option_container}>
          <Pressable>
            <Feather
              style={css.option}
              name="trash-2"
              size={28}
              color={theme.text}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
