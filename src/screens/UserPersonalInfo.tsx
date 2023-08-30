import React, { useEffect, useState } from 'react';

import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAPIToken } from '../utils/api';
import { View, Text, StyleSheet } from 'react-native';
import { UserStyle } from './styles/UserPersonalInfoStyle';
import { User } from '../types';
import { getUserInfo } from '../utils/user';

function UserPersonalInfo() {
  //define and initialize user
  const [user, setUser] = useState<User>({
    id: 0,
    fullname: 'N/A',
    phone: 'N/A',
    email: 'N/A',
    address: 'N/A',
  });

  //get the api token
  useEffect(() => {
    getUserInfo().then(data => setUser(data));
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