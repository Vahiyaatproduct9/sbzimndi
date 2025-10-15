import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { SetStateAction } from 'react';
import Hero from './sections/hero/hero.tsx';
import Body from './sections/body/body.tsx';
import theme from '../colors/ColorScheme.ts';
import Accessories from './sections/accessories/accessories.tsx';
import { useProfileStore } from './store/useProfileStore.ts';

type activeTab = 'home' | 'search' | 'add' | 'profile';
interface props {
  setActiveTab: React.Dispatch<SetStateAction<activeTab>>;
}
export default function ({ route }: { route: { params: props } }) {
  const profile = useProfileStore(s => s.profile);
  const { setActiveTab } = route.params;
  // console.log('profile from home.tsx: ', profile);
  return (
    <SafeAreaView style={styles.container}>
      {profile && <Accessories setActiveTab={setActiveTab} profile={profile} />}

      <ScrollView>
        <Hero setActiveTab={setActiveTab} />
        <Body />
      </ScrollView>
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
