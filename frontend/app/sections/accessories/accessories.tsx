import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import css from './accessories.css';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from '../../../colors/ColorScheme';
import { useNavigation } from '@react-navigation/native';
import { tabs } from '../../../types/signup';
const Accessories = ({
  profile,
  setActiveTab,
}: {
  profile: any;
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
}) => {
  const navigation = useNavigation();

  return (
    <View style={css.container}>
      <Pressable
        style={[css.box, css.profile]}
        onPress={() => setActiveTab('profile')}
      >
        {profile?.items?.profile_picture ? (
          <Image
            source={{ uri: profile.items.profile_picture }}
            style={css.profilePicture}
          />
        ) : (
          <FontAwesome name="user-circle" size={28} color={theme.text} />
        )}
        <View style={css.profile_box}>
          <Text style={css.text}>
            {profile?.items?.full_name
              ? String(profile.items.full_name).split(' ')[0]
              : 'User'}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Messages' as never)}
      >
        <MaterialIcons name="message" size={28} color={theme.text} />
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Orders' as never)}
      >
        <Octicons name="gift" size={28} color={theme.text} />
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Notifications' as never)}
      >
        <Ionicons name="notifications" size={28} color={theme.text} />
      </Pressable>
    </View>
  );
};

export default Accessories;
