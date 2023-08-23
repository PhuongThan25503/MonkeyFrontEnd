import React from "react";

import { View, Text, SafeAreaView, TextInput, Button, Image, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import loginStyles from "./styles/LoginStyle";
import FacebookSignInButton from "../components/FacebookSignInButton"
import GoogleSignInButton from "../components/GoogleSignInButton";

function Login() {
  return (
    <SafeAreaView style={loginStyles.all}>
      <View>
        <Image resizeMode="contain" style={loginStyles.image} source={require('../assets/monkey-junior.png')} />
        <View style={loginStyles.login_box}>
          <View>
            <Text style={loginStyles.text}>
              Username
            </Text>

            <TextInput style={loginStyles.input}>
            </TextInput>
          </View>

          <View>
            <Text style={loginStyles.text}>
              Password
            </Text>

            <TextInput style={loginStyles.input}>
            </TextInput>
          </View>

          <View style={loginStyles.button}>
            <Button title="Sign in"></Button>
            <Text style={loginStyles.text}>or</Text>
              <FacebookSignInButton></FacebookSignInButton>
              <GoogleSignInButton></GoogleSignInButton>
            <Text style={loginStyles.text}>
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