import React, { useState } from "react";

import { View, Text, SafeAreaView, TextInput, Button, Image, Dimensions } from "react-native";

import loginStyles from "./style";
import FacebookSignInButton from "../../components/buttons/FacebookSignInButton"
import GoogleSignInButton from "../../components/buttons/GoogleSignInButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { handleLogin } from "../../utils/authenticate";

type Props = {
  navigation:NativeStackNavigationProp<RootStackParamList>;
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
        <Image resizeMode="contain" style={loginStyles.image} source={require('../../assets/monkey-junior.png')} />
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