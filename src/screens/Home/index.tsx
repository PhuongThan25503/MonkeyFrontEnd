import * as React from "react";
import { useState, useEffect } from "react";

import { View, SafeAreaView, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavProps, User } from "../../types";
import { defaultUser, getUserInfo } from "../../utils/user";
import { getAPIToken, isLoggedIn } from "../../utils/authenticate";
import { HomeStyle } from "./style";
import UserButton from "../../components/buttons/UserButton";
import LoginButton from "../../components/buttons/LoginButton";
import FunctionalButton from "../../components/buttons/FunctionalButton";
import { FunctionalButtonStyle } from "../../components/buttons/styles/FunctionalButtonStyle";



function Home({ navigation }: StackNavProps) {
  const [user, setUser] = useState<User>(defaultUser);
  const [checkLoggedIn, setCheckLoggedIn] = useState(false);

  const [apikey, setApiKey] = useState('');

  getAPIToken().then(data => setApiKey(data));

  //use the useFocusEffect hook to call the refresh function on focus
  useFocusEffect(
    React.useCallback(() => {
      isLoggedIn().then(result => {
        setCheckLoggedIn(result);
        if (result) {
          getUserInfo().then(data => { setUser(data) });
        }
      });
    }, [])
  );

  return (
    <SafeAreaView style={HomeStyle.screen}>
      <View style={{ position: 'absolute' }}>
        <Image style={{ position: 'absolute' }} resizeMode="contain" source={require('../../assets/story-background.jpg')}></Image>
      </View>
      <View style={HomeStyle.header}>
        <View style={HomeStyle.headerLeft}>
        </View>
        <View style={HomeStyle.authenticate}>{
          checkLoggedIn ?
            <UserButton navigation={navigation} onPressProp={() => { }} userData={user} style={HomeStyle.loginButton}></UserButton>
            :
            <LoginButton onPress={() => navigation.navigate('Login')} style={HomeStyle.loginButton}></LoginButton>
        }
        </View>
      </View>
      <View style={HomeStyle.backGroundBound}>
        <Image style={HomeStyle.backGround} resizeMode="contain" source={require('../../assets/monkey-junior.png')}></Image>
      </View>
      <View style={HomeStyle.functionButtonField}>
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"Story"} Icon={<Entypo name='open-book' style={FunctionalButtonStyle.icon}></Entypo>} onPressProp={() => navigation.navigate('StoryList')}></FunctionalButton>
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"Audio"} Icon={<MaterialIcons name='audiotrack' style={FunctionalButtonStyle.icon}></MaterialIcons>} onPressProp={() => navigation.navigate('Audio')}></FunctionalButton>
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"History"} Icon={<FontAwesome name='history' style={FunctionalButtonStyle.icon}></FontAwesome>} onPressProp={() => navigation.navigate('History')}></FunctionalButton>
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"Setting"} Icon={<AntDesign name='setting' style={FunctionalButtonStyle.icon}></AntDesign>} onPressProp={() => navigation.navigate('Test')}></FunctionalButton>
      </View>
    </SafeAreaView>
  );
}

export default Home;