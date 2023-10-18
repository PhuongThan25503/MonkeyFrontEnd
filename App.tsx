/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Linking } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-gesture-handler";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';

import { RootStackParamList } from './src/types';
import { NOTICHANNEL, REFRESH_INTERVAL } from './src/config';
import AppStackNavigatior from './src/navigation/AppStackNavigator';
import { getAPIToken, refreshToken } from './src/utils/authenticate';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator<RootStackParamList>();

const handleDynamicLink = (link: any) => {
  // Handle dynamic link inside your own application
  if (link.url === 'https://monkeyapp.page.link/H3Ed') {
    console.log('good you did it')
  }
};

function App() {
  PushNotification.createChannel(
    {
      channelId: NOTICHANNEL,
      channelName: 'My Channel',
      channelDescription: 'A channel to categorize your notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

  useEffect(() => {
    // Call the token refresh function
    refreshToken();

    // Set up the interval to call the token refresh function
    const interValid = setInterval(refreshToken, REFRESH_INTERVAL);

    const unsubscribe1 = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener

    //open the section via link
    const unsubscribe2 = messaging().onNotificationOpenedApp(async remoteMessage => {
      const link = remoteMessage.data?.link;
      console.log(link);
      if (typeof link === 'string') {
        Linking.openURL(link).catch((err) => console.error('An error occurred', err));
      } else {
        console.error('The link is not a string');
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      clearInterval(interValid);
    }
  }, []);

  return (
    <AppStackNavigatior></AppStackNavigatior>
  );
}

export default App;
