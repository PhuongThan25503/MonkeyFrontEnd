/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import { RootStackParamList } from './src/types'; 
import UserPersonalInfo from './src/screens/UserPersonalInfo';
import Story from './src/screens/Story';
import StoryDetail from './src/screens/StoryDetail';
import Audio from './src/screens/Audio';
import { REFRESH_INTERVAL } from './src/config';
import { getAPIToken, refreshToken } from './src/utils/authenticate';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(){

  useEffect(()=>{
    // Call the token refresh function
    refreshToken();

    // Set up the interval to call the token refresh function
    const interValid = setInterval(refreshToken, REFRESH_INTERVAL); 

    return () => clearInterval(interValid);
  }, []);

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name='Home' 
          component={Home}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name='Story' 
          component={Story}
        />
        <Stack.Screen 
          name='Audio' 
          component={Audio}
        />
        <Stack.Screen 
          name='StoryDetail' 
          component={StoryDetail}
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
