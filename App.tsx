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
import dynamicLinks, { firebase } from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';

import { RootStackParamList } from './src/types';
import { NOTICHANNEL, REFRESH_INTERVAL } from './src/config';
import AppStackNavigatior from './src/navigation/AppStackNavigator';
import { getAPIToken, refreshToken } from './src/utils/authenticate';
import PushNotification from 'react-native-push-notification';
import { getFCMkey } from './src/utils/pushNotificationhelper';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    (created) => console.log(`createChannel returned ${created}`)
  );
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // process the notification
      // pass data through the notification
      const data = notification.data;
      console.log('DATA:', data.link);
      Linking.openURL(data.link);
    },
  });
  useEffect(() => {
    // Call the token refresh function
    messaging().getToken().then(data => console.log("FCM key: " + data));

    refreshToken();
    // Set up the interval to call the token refresh function
    const interValid = setInterval(refreshToken, REFRESH_INTERVAL);

    const unsubscribe1 = messaging().getInitialNotification().then((notificationOpen: any) => {
      if (notificationOpen) {
        Linking.openURL(notificationOpen.data.link).catch((err) => console.error('An error occurred', err));
      }
    })

    //open the section via link ( not available when app is off)
    const unsubscribe = messaging().onNotificationOpenedApp(async remoteMessage => {
      const link = remoteMessage.data?.link;
      console.log(link);
      if (typeof link === 'string') {
        Linking.openURL(link).catch((err) => console.error('An error occurred', err));
      } else {
        console.error('The link is not a string');
      }
    });

    return () => {
      unsubscribe();
      clearInterval(interValid);
    }
  }, []);

  return (
    <AppStackNavigatior></AppStackNavigatior>
  );
}

export default App;
