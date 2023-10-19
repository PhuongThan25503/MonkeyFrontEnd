import React, { useEffect } from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function Test() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log( remoteMessage.data?.link );
      //Linking.openURL(remoteMessage.data?.link).catch((err) => console.error('An error occurred', err));
    });
    
    return unsubscribe;
  }, []);
  return (
    <View style={{
      borderColor: 'red',
      borderWidth: 20,
      alignContent: 'center',
      alignItems: 'center',
      height: 200
    }}>
      <View style={{
        backgroundColor: 'yellow',
        height: 100,
        width: 100,
        position: 'relative'
      }}>
      </View>
    </View>
  );

}
