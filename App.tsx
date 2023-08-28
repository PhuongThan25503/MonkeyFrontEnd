/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import { RootStackParamList } from './src/types'; 
import UserPersonalInfo from './src/screens/UserPersonalInfo';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name='Home' 
          component={Home}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Login' 
          component={Login}
        />
        <Stack.Screen 
          name='UserPersonalInfo' 
          component={UserPersonalInfo}
          options={{title:'Personal info'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
