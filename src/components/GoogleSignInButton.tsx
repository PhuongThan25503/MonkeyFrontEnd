import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity } from 'react-native';

import GoogleSignInButtonStyle from './styles/GoogleSignInButtonStyle';

const GoogleSignInButton = (): JSX.Element => {
	return (
		<TouchableOpacity>
			<View style={GoogleSignInButtonStyle.box}>
				<Icon name='google' size={25} style={GoogleSignInButtonStyle.icon}></Icon>
				<Text style={GoogleSignInButtonStyle.text}>Sign in with google</Text>
			</View>
		</TouchableOpacity>
  )
};



export default GoogleSignInButton;