import * as React from "react";
import { useState } from "react";

import { View, Text, SafeAreaView, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import * as KeyChain from 'react-native-keychain';

import { RootStackParamList } from "../navigator/RootStackParamList";
import { SECURE_KEY } from "../config";

type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Home'> //generic type in typescrypt

type Props = {
  navigation: HomeScreenNavigationProp;
}

function Home({ navigation }: Props) {
  const [apiToken, setApiToken] = useState('Okeee');
  try{
    //get token
    KeyChain.getGenericPassword({
      service: SECURE_KEY,
    }).then(data => {
      if(data){
        setApiToken(data.password);
      }
    });
  } catch (error){
    console.log(error);
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={{color:'black'}}>
          API token : {apiToken}
        </Text>
        <Text>
          Home
        </Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')}></Button>
      </View>
    </SafeAreaView>
  );
}

export default Home;