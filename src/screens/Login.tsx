import React, { useState } from "react";

import { View, Text, SafeAreaView, TextInput, Button, Image, Dimensions } from "react-native";
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import loginStyles from "./styles/LoginStyle";
import FacebookSignInButton from "../components/FacebookSignInButton"
import GoogleSignInButton from "../components/GoogleSignInButton";
import { IP } from "../config"; //IP of free ngrok version
import { SECURE_KEY } from "../config"; //Secure key of react-native-keychain
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = {
  navigation:NativeStackNavigationProp<RootStackParamList>;
};

const handleLogin = async (username: String, password: String) => {
  const API_URL = IP + '/api/authenticate';
  try {
    let response = await axios.post(API_URL, {
      username,
      password
    });
    //handle the response from API
    let apiToken = await response.data;
    let { token } = await apiToken;

    //for debugging
    console.log(apiToken);

    //save the api token 
    await Keychain.setGenericPassword('apiToken', token, {
      service: SECURE_KEY,
    });
  } catch (error) {
    console.error(error);
  }
};

function Login( {navigation} : Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    //authenticate and save the token
    await handleLogin(username, password);
    //redirect to home 
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={loginStyles.screen}>
      <View>
        <Image resizeMode="contain" style={loginStyles.image} source={require('../assets/monkey-junior.png')} />
        <View style={loginStyles.login_box}>
          <View style={loginStyles.input_box}>
            <Text style={loginStyles.text}>
              Username
            </Text>

            <TextInput onChangeText={(text) => setUsername(text)} style={loginStyles.input}>
            </TextInput>
          </View>

          <View style={loginStyles.input_box}>
            <Text style={loginStyles.text}>
              Password
            </Text>

            <TextInput onChangeText={(text) => setPassword(text)} style={loginStyles.input}>
            </TextInput>
          </View>

          <View style={loginStyles.button_field}>
            <View style={loginStyles.button_field}>
              <Button title="Sign in" onPress={() => handleSubmit()}></Button>
            </View>
            <View style={loginStyles.separate_field}>
              <View style={loginStyles.separate_line}></View>
              <Text style={loginStyles.text}>or</Text>
              <View style={loginStyles.separate_line}></View>
            </View>

            <FacebookSignInButton style={loginStyles.third_party_login_button}></FacebookSignInButton>
            <GoogleSignInButton style={loginStyles.third_party_login_button}></GoogleSignInButton>

            <Text style={[loginStyles.text, loginStyles.third_party_login_button]}>
              Don't have an account ?
            </Text>
            <Button title="Register"></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login