import { View, Text } from 'react-native';
import React from 'react';

const Messages = ({ route }: any) => {
  const { conversation_id } = route.params;
  return (
    <View>
      <Text>{`${conversation_id}`}</Text>
    </View>
  );
};

export default Messages;
