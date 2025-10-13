import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './editProfile.style.ts';
import RNFS from 'react-native-fs';
import spiritAnimals from '../../../data/spiritAnimals.ts';
import { Picker } from '@react-native-picker/picker';
import {
  getSpirit,
  saveSpirit,
} from '../../../functions/toggleSpiritAnimal.ts';
import Cbutton from '../../../components/button/cbutton.tsx';
import Switch from '../../../components/switch/switch.tsx';
const image = require('../../../../assets/images/sky.png');
import { launchImageLibrary } from 'react-native-image-picker';
import {
  getBio,
  getName,
  setName as sn,
  setBio as sb,
} from '../../../functions/getLocalInfo.ts';
import updateProfile from '../../../../api/updateProfile.ts';
// import Message from '../../../components/message/message.tsx';
import saveProfilePicture from '../../../functions/saveProfilePicture.ts';
import saveRole, { getRole } from '../../../functions/toggleRole.ts';
import blobtobase64 from '../../../functions/blobtobase64.ts';
import getProfile from '../../../../api/getProfile.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation, route }: any) => {
  const { profile } = route.params;
  // const [mess, setMess] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [spiritAnimal, setSpiritAnimal] = useState<string>('');
  const [pressed, setPressed] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const renderItem = (list: { label: string; value: string }[]) =>
    list.map((item, index) => {
      return (
        <Picker.Item
          key={index.toString()}
          label={item.label}
          value={item.value}
        />
      );
    });

  const cleanPath = (uri: string) =>
    uri.toString().startsWith('file://')
      ? uri.toString().replace('file://', '')
      : uri.toString();
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async res => {
      if (!res.didCancel && !res.errorCode) {
        if (res.assets && typeof res.assets[0].uri === 'string') {
          await RNFS.copyFile(
            cleanPath(res.assets[0].uri),
            cleanPath(`${RNFS.DocumentDirectoryPath}/profile.jpg`),
          );
          console.log('Picked image uri:', res.assets[0].uri);
          const newPath = `file://${
            RNFS.DocumentDirectoryPath
          }/profile.jpg?time=${Date.now()}`;
          console.log('New profile path:', newPath);
          setPhoto(newPath);
        }
      }
    });
  };
  useEffect(() => {
    console.log(photo);
  }, [photo]);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  const handleSubmit = async () => {
    setUploading(true);
    const localPath = `${RNFS.DocumentDirectoryPath}/profile.jpg`;
    try {
      let shouldUpload = false;
      // Check if there's a new photo selected
      if (photo) {
        // Check if local profile exists
        const localExists = await RNFS.exists(cleanPath(localPath));
        console.log('Local profile exists:', localExists);

        if (localExists) {
          try {
            // Compare the selected photo with the existing local profile
            const localStat = await RNFS.stat(cleanPath(localPath));
            const newStat = await RNFS.stat(cleanPath(photo));

            console.log(
              'Local size:',
              localStat.size,
              'New size:',
              newStat.size,
            );

            // Upload if sizes are different (indicating a different image)
            if (localStat.size !== newStat.size) {
              shouldUpload = true;
            }
          } catch (statError) {
            console.log('Error comparing files:', statError);
            // If we can't compare, upload the new photo
            shouldUpload = true;
          }
        } else {
          // No local profile exists, definitely upload
          shouldUpload = true;
        }
      }

      console.log('Should upload:', shouldUpload);

      const {
        success,
        // message
      } = await updateProfile({
        photo: shouldUpload && photo.length > 10 ? photo : null,
        name,
        spirit_animal: spiritAnimal,
        user_type: toggle ? 'seller' : 'buyer',
        bio,
      });

      if (success === true) {
        try {
          // setMess(message || 'Success');
          await saveSpirit(spiritAnimal);
          await saveRole(toggle ? 'seller' : 'buyer');
          await sn(name);
          await sb(bio);

          // Only save the new profile picture if we uploaded one
          if (shouldUpload && photo) {
            await saveProfilePicture(cleanPath(photo), 'profile');
          }

          // setMess('Profile Updated Successfully!');
          await getProfile({ access_token: null, user_id: null })
            .then(
              async newProfile =>
                await AsyncStorage.setItem(
                  'profile',
                  JSON.stringify(newProfile),
                ),
            )
            .then(() => navigation.goBack());
        } catch (saveError) {
          console.log('Error saving profile data:', saveError);
          // setMess('Some Error Occurred!');
        }
      } else {
        // setMess('Some Error Occurred!');
      }
    } catch (err) {
      console.log('Main error:', err);
      // setMess('Some Error Occurred!');
    }
    setUploading(false);
  };
  useEffect(() => {
    if (
      profile.items.profile_picture &&
      profile.items.profile_picture.length > 0
    ) {
      setPhoto(profile.items.profile_picture);
    } else {
      (async () => {
        await RNFS.exists(`${RNFS.DocumentDirectoryPath}/profile.jpg`).then(
          exists => {
            if (exists) {
              const path = `file://${
                RNFS.DocumentDirectoryPath
              }/profile.jpg?time=${Date.now()}`;
              console.log('Profile picture path:', path);
              setPhoto(path);
            } else {
              const base64img = (async () => {
                return await blobtobase64(image);
              })();
              setPhoto(base64img);
              console.log('No local profile picture found, using default.');
            }
          },
        );
      })();
    }
  }, [profile.items.profile_picture]);
  useEffect(() => {
    (async () => {
      if (profile.items) {
        setName(profile.items.full_name);
        setBio(profile.items.bio);
        setSpiritAnimal(profile.items.spirit_animal);
        setToggle(profile.items.user_type === 'seller' ? true : false);
        console.log(profile.items.name);
      } else {
        await getName().then(res => res && setName(res));
        await getBio().then(res => res && setBio(res));
        await getRole().then(res => res === 'seller' && setToggle(true));
        await getSpirit().then(spirit => spirit && setSpiritAnimal(spirit));
      }
    })();
  }, [profile]);

  useEffect(() => {
    const run = async () => {
      await saveSpirit(spiritAnimal);
    };
    run();
  }, [spiritAnimal]);
  return (
    <ScrollView style={css.container}>
      {/* <Message state={setMess} content={mess} time={3} /> */}
      <View style={css.box}>
        <Image
          source={photo && photo.length > 0 ? { uri: photo } : image}
          style={css.image}
          onError={e => {
            console.warn('Image load failed:', e.nativeEvent.error);
          }}
        />
        <Pressable style={css.changeBtn} onPress={pickImage}>
          <Text style={css.text}>Change Picture</Text>
        </Pressable>
        <View style={css.TextBox}>
          <Text style={[css.text, css.label]}>Name: {toggle}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={'Ramesh Mahata'}
            placeholderTextColor={'rgba(255,255,255,0.3)'}
            style={css.textInput}
          />
        </View>
        <View style={css.TextBox}>
          <Text style={[css.text, css.label]}>Spirit Animal:</Text>
          <Picker
            mode="dropdown"
            collapsable
            selectedValue={spiritAnimal}
            selectionColor={'green'}
            style={css.picker}
            onValueChange={animal => setSpiritAnimal(animal)}
          >
            {renderItem(spiritAnimals)}
          </Picker>
        </View>
        <View style={[css.TextBox, css.switch]}>
          <Text style={[css.text, css.label]}>User Type:</Text>
          <Text style={[css.text, css.label]}>
            {toggle ? 'Seller' : 'Buyer'}
          </Text>
        </View>
        {profile.items.upi_id.length > 0 &&
          profile.items.upi_name.length > 0 && (
            <View style={[css.TextBox, css.switch]}>
              <Text style={[css.text, css.label]}>Force Seller</Text>
              <Switch value={toggle} pressedState={setToggle} />
            </View>
          )}
        <View style={css.TextBox}>
          <Text style={[css.text, css.label]}>Bio:</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder={'New to SbziMndi'}
            placeholderTextColor={'rgba(255,255,255,0.3)'}
            style={[css.textInput, css.bio]}
            multiline
            numberOfLines={5}
            maxLength={300}
            scrollEnabled
          />
        </View>
        <Cbutton
          containerStyle={css.saveBtn}
          text="Save"
          pressedState={setPressed}
          pressed={pressed}
          loading={uploading}
          loadingWord="Saving..."
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;
