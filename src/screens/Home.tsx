import * as React from "react";
import { useState, useEffect } from "react";

import { View, SafeAreaView, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList, User } from "../types";
import { isLoggedIn } from "../utils/authenticate";
import { HomeStyle } from "./styles/HomeStyle";
import LoginButton from "../components/buttons/LoginButton";
import UserButton from "../components/buttons/UserButton";
import { defaultUser, getUserInfo } from "../utils/user";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

function Home({ navigation }: Props) {
  const [user, setUser] = useState<User>(defaultUser);
  const [checkLoggedIn, setCheckLoggedIn] = useState(false);

  //use the useFocusEffect hook to call the refresh function on focus
  useFocusEffect(
    React.useCallback(() => {
      isLoggedIn().then(result => {
        setCheckLoggedIn(result);
        if (result) {
          getUserInfo().then(data => { setUser(data) });
        }
      });
    }, [])
  );

  return (
    <SafeAreaView style={HomeStyle.screen}>
      <View style={{}}>
        <Image style={HomeStyle.backGround} resizeMode="contain" source={require('../assets/monkey-junior.png')}></Image>
        <View style={HomeStyle.header}>
          <View style={HomeStyle.headerLeft}>
          </View>
          <View style={HomeStyle.authenticate}>{
            checkLoggedIn ?
              <UserButton navigation={navigation} onPressProp={() => { }} userData={user} style={HomeStyle.loginButton}></UserButton>
              :
              <LoginButton onPress={() => navigation.navigate('Login')} style={HomeStyle.loginButton}></LoginButton>
          }
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;