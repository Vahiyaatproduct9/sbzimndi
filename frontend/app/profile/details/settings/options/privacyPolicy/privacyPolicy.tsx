import { View, Text } from 'react-native';
import React from 'react';
import css from './privacyPolicy.css';
const PrivacyPolicy = () => {
  return (
    <View style={css.container}>
      <View style={css.block}>
        <Text style={css.header}>PrivacyPolicy</Text>
        <Text style={css.subHeader}>Effective Date: October 25, 2025</Text>
        <Text style={css.body}>
          SbzMndi (“we”, “our”, “us”) operates the mobile and web application
          available at https://github.com/vahiyaatProduct9/sbzimndi
        </Text>
      </View>
      <View style={css.block}>
        <Text style={css.subHeader}>1. Information We Collect</Text>
        <Text style={css.body}></Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
