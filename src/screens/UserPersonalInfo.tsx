import React, { useEffect, useState } from 'react';

import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IP } from '../config';
import axios from 'axios';
import { GetAPIToken } from '../utils/api';
import { View , Text, StyleSheet} from 'react-native';
import { UserStyle } from './styles/UserPersonalInfoStyle';
import { User } from '../types';

type UserScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserPersonalInfo'>

type Props = {
  navigation: UserScreenNavigationProp;
}

function UserPersonalInfo({ navigation }: Props) {
  //define and initialize user
  const [user, setUser] = useState<User>({
    id: 0,
    fullname: 'N/A',
    phone: 'N/A',
    email: 'N/A',
    address: 'N/A',
  });

  //get user info
  async function setUserInfo() {
    try {
      let api_token = await GetAPIToken();
      let apiUrl = IP + '/api/getPersonalInfo';
      let config = {
        headers: { Authorization: `Bearer ${api_token}` }
      }
      await axios.post(apiUrl, '', config)
        .then(response => setUser(response.data))
    } catch (error) {
      console.error(error);
    }
  }

  //get the api token
  useEffect(() => {
    setUserInfo();
  }, [])

  return (
    <SafeAreaView style={UserStyle.screen}>
      <View style={UserStyle.subOuterBound}>
        <View style={UserStyle.avatarBound}>
          <View style={UserStyle.fakeAvatar}>
            <Text style={UserStyle.textAvatar}>{user.fullname.charAt(0)}</Text>
          </View>
        </View>
        <View style={UserStyle.infoBound}>
          <View style={StyleSheet.compose(UserStyle.infoField, UserStyle.nameField)}>
            <Text style={UserStyle.textName}>{user.fullname}</Text>
          </View>
          <View style={UserStyle.infoField}>
            <Text style={UserStyle.fieldTitle}>Phone: </Text>
            <Text style={UserStyle.text}>{user.phone}</Text>
          </View>
          <View style={UserStyle.infoField}>
            <Text style={UserStyle.fieldTitle}>Email: </Text>
            <Text style={UserStyle.text}>{user.email}</Text>
          </View>
          <View style={UserStyle.infoField}>
            <Text style={UserStyle.fieldTitle}>Address: </Text>
            <Text style={UserStyle.text}>{user.address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserPersonalInfo;