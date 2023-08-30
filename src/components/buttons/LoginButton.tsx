import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity } from 'react-native';

import { ViewStyle } from 'react-native';
import { LoginButtonStyle } from './styles/LoginButtonStyle';

type Props = {
	style: ViewStyle,
  onPress: () => void, //define type of prop as a void function
}

const LoginButton = ({ style, onPress }: Props): JSX.Element => {
	return (
		<TouchableOpacity onPress={onPress} style={style}>
			<View style={LoginButtonStyle.box}>
				<Icon name='user' size={30} style={LoginButtonStyle.icon}></Icon>
			</View>
		</TouchableOpacity>
	)
};

export default LoginButton;