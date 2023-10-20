import * as React from "react";
import { useState, useEffect } from "react";

import { View, SafeAreaView, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StackNavProps, User } from "../../types";
import { defaultUser, getUserInfo } from "../../utils/user";
import { getAPIToken, isLoggedIn } from "../../utils/authenticate";
import { HomeStyle } from "./style";
import UserButton from "../../components/buttons/UserButton";
import LoginButton from "../../components/buttons/LoginButton";
import FunctionalButton from "../../components/buttons/FunctionalButton";
import { FunctionalButtonStyle } from "../../components/buttons/styles/FunctionalButtonStyle";
import { useUserInfor } from "../../utils/globalState";



function Home({ navigation }: StackNavProps) {
  const user = useUserInfor((state:any) => state.user);

  //use the useFocusEffect hook to call the refresh function on focus
  // useFocusEffect(
  //   React.useCallback(() => {
  //     isLoggedIn().then(result => {
  //       setCheckLoggedIn(result);
  //       if (result) {
  //         getUserInfo().then(data => { setUser(data) });
  //       }
  //     });
  //   }, [])
  // );
  useEffect(()=>{
    console.log(user);
  },[user])

  return (
    <SafeAreaView style={HomeStyle.screen}>
      <View style={{ position: 'absolute' }}>
        <Image style={{ position: 'absolute' }} resizeMode="contain" source={require('../../assets/story-background.jpg')}></Image>
      </View>
      <View style={HomeStyle.header}>
        <View style={HomeStyle.headerLeft}>
        </View>
        <View style={HomeStyle.authenticate}>{
          user ?
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
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"StarWine"} Icon={<FontAwesome5 name='wine-glass' style={FunctionalButtonStyle.icon}></FontAwesome5>} onPressProp={() => navigation.navigate('StarWine')}></FunctionalButton>
        <FunctionalButton styleProp={HomeStyle.functionalButton} title={"Setting"} Icon={<AntDesign name='setting' style={FunctionalButtonStyle.icon}></AntDesign>} onPressProp={() => navigation.navigate('Setting')}></FunctionalButton>
      </View>
    </SafeAreaView>
  );
}

export default Home;