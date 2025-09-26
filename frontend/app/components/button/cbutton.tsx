import { View, Pressable, Text, StyleSheet } from 'react-native';
import React, { SetStateAction } from 'react';
import { StyleSheetProperties } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheet';
import theme from '../../../colors/ColorScheme.ts';
import { GestureResponderEvent } from 'react-native';

interface prop {
  containerStyle?: StyleSheetProperties | null | undefined;
  style?: StyleSheetProperties | null | undefined;
  pressedStyle?: StyleSheetProperties | null | undefined;
  textStyle?: StyleSheetProperties | null | undefined;
  text: string;
  pressed?: boolean;
  pressedState?: React.Dispatch<SetStateAction<boolean>>;
  onPress?: GestureResponderEvent;
  loading?: boolean;
  loadingWord?: string;
}

const Cbutton = ({
  containerStyle,
  style,
  pressedStyle,
  textStyle,
  pressed,
  text,
  loading,
  loadingWord,
  pressedState,
  onPress,
}: prop) => {
  return (
    <View style={[css.containerStyle, containerStyle]}>
      <Pressable
        onPressIn={pressedState && (() => pressedState(true))}
        onPressOut={pressedState && (() => pressedState(false))}
        onPress={onPress ? onPress : () => {}}
        style={[
          css.saveBtn,
          style,
          pressed ? [css.buttonPressed, pressedStyle] : null,
        ]}
      >
        <Text style={[css.textStyle, textStyle]}>
          {loading ? loadingWord : text}
        </Text>
      </Pressable>
    </View>
  );
};

const css = StyleSheet.create({
  containerStyle: {
    width: '100%',
    padding: 5,
  },
  buttonPressed: {
    transform: 'scale(0.98)',
  },
  saveBtn: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: theme.tint,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: theme.text,
    fontSize: 18,
  },
});
export default Cbutton;
