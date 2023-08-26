import React, { useEffect, useState } from 'react';

import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IP } from '../config';
import axios from 'axios';
import { GetAPIToken } from '../utils/api';
import { View , Text} from 'react-native';

type UserScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserPersonalInfo'>

type Props = {
  navigation: UserScreenNavigationProp;
}

function UserPersonalInfo({ navigation }: Props) {
  const [user, setUser] = useState('');
  const [api_token, setApi_token] = useState('');

  //get user info
  async function setUserInfo() {
    try {
      GetAPIToken().then(token => setApi_token(token));
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
    <SafeAreaView>
      <View>
        <Text style={{color: 'black'}}>
          {JSON.stringify(user)}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default UserPersonalInfo;