import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import FacebookSignInButtonStyle from './styles/FacebookSigninButtonStyle';

const FacebookSignInButton = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <View style={FacebookSignInButtonStyle.box}>
        <Icon name="facebook" size={25} style={FacebookSignInButtonStyle.icon}/>
        <Text style={FacebookSignInButtonStyle.text}>Sign in with Facebook</Text>
      </View>
    </TouchableOpacity>
  )
};

export default FacebookSignInButton;

