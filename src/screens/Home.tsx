import * as React from "react";
import { useState, useEffect } from "react";

import { View, Text, SafeAreaView, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types"; 
import { GetAPIToken } from "../utils/api";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'> //generic type in typescrypt

type Props = {
  navigation: HomeScreenNavigationProp;
}

function Home({ navigation }: Props) {
  return (
    <SafeAreaView>
      <View>
        <Button title="Login" onPress={() => navigation.navigate('Login')}></Button>
        <Button title="User" onPress={() => navigation.navigate('UserPersonalInfo')}></Button>
      </View>
    </SafeAreaView>
  );
}

export default Home;