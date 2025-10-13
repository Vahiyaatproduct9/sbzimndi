import React, { forwardRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import css from '../../sections/accessories/items/messages/text/text.css';
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

const MessageList = forwardRef(
  ({ list, my_id }: { list?: Message[]; my_id: string }, ref) => (
    <FlatList
      ref={ref}
      data={list}
      style={css.ScrollView}
      keyExtractor={item => item?.id || Math.random().toString()}
      renderItem={({ item }) =>
        item.sender_id === my_id ? (
          <MessageFromHere text={item?.body || 'Unknown Message'} />
        ) : (
          <MessageFromThere text={item?.body || 'Unknown Message'} />
        )
      }
      onContentSizeChange={() => ref?.current?.scrollToEnd({ animated: true })}
    />
  ),
);

export default React.memo(MessageList);
