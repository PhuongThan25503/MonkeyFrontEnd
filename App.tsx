/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import { REFRESH_INTERVAL } from './src/config';
import { getAPIToken, refreshToken } from './src/utils/authenticate';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppStackNavigatior from './src/navigation/AppStackNavigator';
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  useEffect(() => {
    // Call the token refresh function
    refreshToken();

    // Set up the interval to call the token refresh function
    const interValid = setInterval(refreshToken, REFRESH_INTERVAL);

    return () => clearInterval(interValid);
  }, []);

  return (
    <AppStackNavigatior></AppStackNavigatior>
  );
}

export default App;
