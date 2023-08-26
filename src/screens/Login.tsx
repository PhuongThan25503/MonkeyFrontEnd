import React, { useState } from "react";

import { View, Text, SafeAreaView, TextInput, Button, Image, Dimensions } from "react-native";
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import loginStyles from "./styles/LoginStyle";
import FacebookSignInButton from "../components/FacebookSignInButton"
import GoogleSignInButton from "../components/GoogleSignInButton";
import { IP } from "../config"; //IP of free ngrok version
import { SECURE_KEY } from "../config"; //Secure key of react-native-keychain
import { RootStackParamList } from "../navigator/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiToken, setApiToken] = useState('Okeee');

  const handleLogin = async () => {
    const apiUrl = IP + '/api/authenticate';
    try {
      // const response = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password
      //   }),
      // });
      //   const apiToken = await response.json();
      //   const { token } = apiToken;
      //   console.log(apiToken);
      //   setApiToken(token);
      // } catch (error) {
      //   console.error(error);
      // }
      let response = await axios.post(apiUrl, {
        username,
        password
      });
      //handle the response from API
      let apiToken = await response.data;
      let { token } = await apiToken;

      //for debugging
      console.log(apiToken);
      setApiToken(token);

      //save the api token 
      await Keychain.setGenericPassword('apiToken', token, {
        service: SECURE_KEY,
      });

      //redirect to home 
      await navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={loginStyles.all}>
      <Text style={loginStyles.text}>
        Token: {apiToken}
      </Text>
      <View>
        <Image resizeMode="contain" style={loginStyles.image} source={require('../assets/monkey-junior.png')} />
        <View style={loginStyles.login_box}>
          <View>
            <Text style={loginStyles.text}>
              Username
            </Text>

            <TextInput onChangeText={(text) => setUsername(text)} style={loginStyles.input}>
            </TextInput>
          </View>

          <View>
            <Text style={loginStyles.text}>
              Password
            </Text>

            <TextInput onChangeText={(text) => setPassword(text)} style={loginStyles.input}>
            </TextInput>
          </View>

          <View style={loginStyles.button_field}>
            <View style={loginStyles.button_field}>
              <Button title="Sign in" onPress={() => handleLogin()}></Button>
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