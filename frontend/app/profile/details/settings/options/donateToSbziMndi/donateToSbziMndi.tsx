import { View, Text, Pressable, Linking } from 'react-native';
import React from 'react';
import css from './donateToSbziMndi.css';
const DonateToSbziMndi = () => {
  const visitLink = async () => {
    Linking.openURL('https://razorpay.me/@sbzimndi');
  };
  return (
    <View style={css.container}>
      <View style={css.block}>
        <Text style={css.text}>
          SbziMndi is a solo-developed food waste marketplace aimed at reducing
          edible waste by connecting individuals, stores, and restaurants to
          list surplus food items for donation or quick sale. The project
          focuses on creating a practical, tech-driven approach to food
          redistribution while promoting sustainability and community impact
          through efficient logistics and user-centric design.
        </Text>
      </View>
      <Pressable style={css.button} onPress={visitLink}>
        <Text style={css.text}>Donate</Text>
      </Pressable>
    </View>
  );
};

export default DonateToSbziMndi;
