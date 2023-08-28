import * as React from "react";
import { useState, useEffect } from "react";

import { View, Text, SafeAreaView, Button, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import { GetAPIToken } from "../utils/api";
import { HomeStyle } from "./styles/HomeStyle";
import LoginButton from "../components/LoginButton";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

function Home({ navigation }:Props) {
  return (
    <SafeAreaView style={HomeStyle.screen}>
      <View style={{}}>
        <Image style={HomeStyle.backGround} resizeMode="contain" source={require('../assets/monkey-junior.png')}></Image>
        <View style={HomeStyle.header}>
          <View style={HomeStyle.headerLeft}>
            <Text>Left part</Text>
          </View>
          <View style={HomeStyle.authenticate}>
            <LoginButton onPress={() => navigation.navigate('Login')} style={HomeStyle.loginButton}></LoginButton>
            {/* <Button title="Login" onPress={() => navigation.navigate('Login')}></Button>
          <Button title="User" onPress={() => navigation.navigate('UserPersonalInfo')}></Button> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;