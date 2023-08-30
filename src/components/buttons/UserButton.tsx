import React, { useRef, useState } from 'react';
import { View, ViewStyle, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { UserButtonStyle } from './styles/UserButtonStyle';
import { anim } from '../../utils/animation';
import { RootStackParamList, User } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { handleLogout } from '../../utils/authenticate';
import HeaderButton from './HeaderButton';

type Props = {
	style: ViewStyle,
	userData: User,
	onPressProp: () => void, //define type of prop as a void function
	navigation: NativeStackNavigationProp<RootStackParamList>,
}

const UserButton = ({ style, userData, onPressProp, navigation }: Props): JSX.Element => {
	const ICON_SIZE = 8;
	const ANIM_DURATION_1 = 250;
	const [buttonToggle, setButtonToggle] = useState(true);
	const scaleAnim = useRef(new Animated.Value(1)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;
	const opacityAnim = useRef(new Animated.Value(0)).current;
	
	const handlePress = () => {
		onPressProp();
		if (buttonToggle) {
			anim(scaleAnim, 4, ANIM_DURATION_1);
			anim(rotateAnim, 180, ANIM_DURATION_1);
			anim(opacityAnim, 100, ANIM_DURATION_1);
		}
		else {
			anim(scaleAnim, 1, ANIM_DURATION_1);
			anim(rotateAnim, 0, ANIM_DURATION_1);
			anim(opacityAnim, 0, ANIM_DURATION_1);
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
			<Animated.View style={StyleSheet.compose(UserButtonStyle.expandField, { transform: [{ scale: scaleAnim }], opacity: opacityAnim })}>
				<View style={UserButtonStyle.fieldName}>
					<Text style={UserButtonStyle.textName}>{userData.fullname.length>20 ? userData.fullname.substring(0,20) + '...' : userData.fullname}</Text>
					<Text style={UserButtonStyle.versionInfo}>MonkeyApp v2.0</Text>
				</View>
				<View style={UserButtonStyle.expandButtonGroup}>
					<HeaderButton title='Personal Info ' Icon={<AntDesign name='user' size={ICON_SIZE} style={UserButtonStyle.icon}></AntDesign>} onPressProp={() => navigation.navigate('UserPersonalInfo')} ></HeaderButton>
					<HeaderButton title='Dash board ' Icon={<Feather name='trending-up' size={ICON_SIZE} style={UserButtonStyle.icon}></Feather>} onPressProp={() => {}} ></HeaderButton>
					<HeaderButton title='Logout ' Icon={<MaterialIcons name='logout' size={ICON_SIZE} style={UserButtonStyle.icon}></MaterialIcons>} onPressProp={() => { handleLogout(); navigation.navigate('Login') }} ></HeaderButton>
				</View>
			</Animated.View>
		</React.Fragment>
	)
};

export default UserButton;