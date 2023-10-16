import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { isKeyExist } from "../utils/asyncStorage";
import { Canvas, Circle, Group, Mask, Rect } from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/messaging";
import { notificationListener, requestUserPermission } from "../utils/pushNotificationhelper";


const { width, height } = Dimensions.get('window');
export default function Test() {
  const defaultAppMessaging = firebase.messaging();
  defaultAppMessaging.getToken().then(data => console.log(data));
  defaultAppMessaging.hasPermission().then(data => console.log(data));
  defaultAppMessaging.isSupported().then(data=> console.log(data)); 
  defaultAppMessaging.onMessageSent((e)=> {console.log('sent')});

  useEffect(()=>{
    notificationListener();
    requestUserPermission();
  },[])
  return (
    <View>

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 3
  },
});
