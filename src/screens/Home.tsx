import * as React from "react";
import { useState, useEffect } from "react";

import { View, Text, SafeAreaView, Button, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList, User } from "../types";
import { getAPIToken } from "../utils/api";
import { HomeStyle } from "./styles/HomeStyle";
import LoginButton from "../components/buttons/LoginButton";
import UserButton from "../components/buttons/UserButton";
import { defaultUser, useGetUserInfo } from "../utils/user";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

function Home({ navigation }:Props) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoggedIn = async () => {
    let apiToken = await getAPIToken();
    if(apiToken.length > 0) {
      setIsLoggedIn(true);
      //getUserInfo().then((data) => {setUser(data)});
      setUser(useGetUserInfo());
    }
  }
  
  useEffect(()=>{
    checkLoggedIn();
  },[]);

  return (
    <SafeAreaView style={HomeStyle.screen}>
      <View style={{}}>
        <Image style={HomeStyle.backGround} resizeMode="contain" source={require('../assets/monkey-junior.png')}></Image>
        <View style={HomeStyle.header}>
          <View style={HomeStyle.headerLeft}>
          </View>
          <View style={HomeStyle.authenticate}>{
            isLoggedIn?
            <UserButton onPressProp={() => {}} userData={user} style={HomeStyle.loginButton}></UserButton>
            :
            <LoginButton onPress={() => navigation.navigate('Login')} style={HomeStyle.loginButton}></LoginButton>
          }
            {/* <Button title="Login" onPress={() => navigation.navigate('Login')}></Button>
          <Button title="User" onPress={() => navigation.navigate('UserPersonalInfo')}></Button> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;