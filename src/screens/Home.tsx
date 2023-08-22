import * as React from "react";

import { View, Text, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> // define the types

function Home({ navigation }: Props) {
  return (
    <SafeAreaView>
      <View>
        <Text>
          Home
        </Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')}></Button>
      </View>
    </SafeAreaView>
  );
}

export default Home;