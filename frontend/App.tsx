import Main from './app/main.tsx';
import LoadingScreen from './app/loadingScreen.tsx';
import { StyleSheet, View } from 'react-native';
import Theme from './colors/ColorScheme.ts';
import { useEffect, useState } from 'react';
import Tabs from './app/tabs/tabs.tsx';
import Search from './app/search/search.tsx';
import Profile from './app/profile/profile.tsx';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AddItem from './app/addItem/addItem.tsx';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

type activeTab = 'home' | 'search' | 'add' | 'profile';

function App() {
  const [logged, setLogged] = useState<boolean | null>(null);
  const animateProperty = {
    y: useSharedValue(80),
    opacity: useSharedValue(0),
  };
  const [active, setActive] = useState<activeTab>('home');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setLoaded(true);
    animateProperty.y.value = withSpring(0);
    animateProperty.opacity.value = withSpring(1);
  }, []);
  const activeBlock = () => {
    if (active === 'home') {
      return <Main setActiveTab={setActive} />;
    } else if (active === 'search') {
      return <Search />;
    } else if (active === 'add') {
      return <AddItem setActiveTab={setActive} />;
    } else if (active === 'profile') {
      return (
        <Profile
          logged={logged}
          profile={profile}
          setLogged={setLogged}
          setActiveTab={setActive}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {loaded ? (
        <>
          <Animated.View
            style={{
              width: '100%',
              position: 'absolute',
              top: animateProperty.y,
              opacity: animateProperty.opacity,
              height: '100%',
            }}
          >
            {activeBlock()}
          </Animated.View>
          <Tabs
            setProfile={setProfile}
            setLogged={setLogged}
            logged={logged}
            active={active}
            setActive={setActive}
            profile={profile}
          />
        </>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgroundColor,
  },
});

export default App;
