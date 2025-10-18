import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, SetStateAction } from 'react';
import theme from '../../../colors/ColorScheme.ts';
import { useEffect, useState } from 'react';
// import Animated from 'react-native-reanimated';

interface Props {
  content: string;
  state: React.Dispatch<SetStateAction<string>>;
  time: number; // in seconds
}

const Message = ({ content, state, time }: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      state('');
    }, time * 1000);
  }, [content, state, time]);
  return (
    content?.length > 0 &&
    show && (
      <View style={[css.cover]}>
        <View style={css.container}>
          <Text style={css.text}>{content ? content : 'Unknown Message'}</Text>
        </View>
      </View>
    )
  );
};

export default Message;

const css = StyleSheet.create({
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 9,

    justifyContent: 'center',
    backgroundColor: theme.text,
    boxShadow: '0 5px 13px rgba(0,0,0,0.4)',
    padding: 10,
    minHeight: 70,
    zIndex: 1,
  },
  text: {
    color: theme.backgroundColor,
    paddingLeft: 20,
  },
});
