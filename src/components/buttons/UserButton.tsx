import React, { useRef, useState } from 'react';
import { View,ViewStyle, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { UserButtonStyle } from './styles/UserButtonStyle';
import { anim } from '../../utils/animation';
import { RootStackParamList, User } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
	style: ViewStyle,
	userData: User,
	onPressProp: () => void, //define type of prop as a void function
}

const UserButton = ({ style, userData, onPressProp }: Props): JSX.Element => {
	const navigation = useNavigation();
	const ICON_SIZE = 8;
	const [buttonToggle, setButtonToggle] = useState(true);
	const scaleAnim = useRef(new Animated.Value(1)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;

	const handlePress = () => {
		onPressProp();
		if (buttonToggle) {
			anim(scaleAnim, 4, 500);
			anim(rotateAnim, 180, 500);
		}
		else {
			anim(scaleAnim, 1, 500);
			anim(rotateAnim, 0, 500);
		}
		setButtonToggle(!buttonToggle);
	};

	//for rotaion, must change number to string 
	let spin = rotateAnim.interpolate({
		inputRange: [0, 360],
		outputRange: ["0deg", "360deg"]
	});

	return (
		<React.Fragment>
			<TouchableOpacity onPress={handlePress} style={StyleSheet.compose(style, UserButtonStyle.button)}>
				<Animated.View style={StyleSheet.compose(UserButtonStyle.box, { transform: [{ rotate: spin }] })}>
					<FontAwesome name='caret-down' size={25} style={UserButtonStyle.icon}></FontAwesome>
				</Animated.View>
			</TouchableOpacity>
			<Animated.View style={StyleSheet.compose(UserButtonStyle.expandField, { transform: [{ scale: scaleAnim }] })}>
				<View style={UserButtonStyle.fieldName}>
					<Text style={UserButtonStyle.textName}>{userData.fullname}</Text>
				</View>
				<View style={UserButtonStyle.expandButtonGroup}>
					<TouchableOpacity onPress={() => navigation.navigate('UserPersonalInfo')} style={UserButtonStyle.expandButton}>
						<View >
							<AntDesign name='user' size={ICON_SIZE} style={UserButtonStyle.icon}></AntDesign>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={UserButtonStyle.expandButton}>
						<View>
							<Feather name='trending-up' size={ICON_SIZE} style={UserButtonStyle.icon}></Feather>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={UserButtonStyle.expandButton}>
						<View >
							<MaterialIcons name='logout' size={ICON_SIZE} style={UserButtonStyle.icon}></MaterialIcons>
						</View>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</React.Fragment>
	)
};

export default UserButton;