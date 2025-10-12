import { View, Text, FlatList } from 'react-native';
import css from '../../sections/accessories/items/messages/text/text.css';
import React from 'react';
import { Message } from '../../../types/types';
export const MessageFromHere = React.memo(({ text }: { text: string }) => (
  <View style={[css.TextContainer, css.TFHContainer]}>
    <Text style={css.TextText}>{text}</Text>
  </View>
));
export const MessageFromThere = React.memo(({ text }: { text: string }) => (
  <View style={[css.TFTContainer, css.TextContainer]}>
    <Text style={css.TextText}>{text}</Text>
  </View>
));

// 'list' is a state array.
// my_id is the id of the localUser
export default React.memo(
  ({ list, my_id }: { list?: Message[]; my_id: string }) => (
    <FlatList
      data={list}
      keyExtractor={item => item?.id || String(Math.random())}
      renderItem={({ item }) =>
        item.sender_id === my_id ? (
          <MessageFromHere
            key={item.id}
            text={item?.body || 'Unknown Messsage'}
          />
        ) : (
          <MessageFromThere
            key={item?.id}
            text={item?.body || 'Unknown Message'}
          />
        )
      }
    />
  ),
);
