import { StyleSheet, SafeAreaView } from 'react-native';
import React, { SetStateAction } from 'react';
import Hero from './sections/hero/hero.tsx';
import Body from './sections/body/body.tsx';
import theme from '../colors/ColorScheme.ts';

type activeTab = 'home' | 'search' | 'add' | 'profile';
interface props {
  setActiveTab: React.Dispatch<SetStateAction<activeTab>>;
}
export default function Main({ route }: { route: { params: props } }) {
  const { setActiveTab } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Hero setActiveTab={setActiveTab} />
      <Body />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.backgroundColor,
  },
});
