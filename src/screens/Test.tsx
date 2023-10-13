import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StatusBar, StyleSheet, View } from "react-native";
import RNFS from 'react-native-fs';
import { useStore } from "zustand";
import { useTextEffect } from "../utils/globalState";
import Indicator from "./components/Indicator/Indicator";
import Octicons from "react-native-vector-icons/Octicons"
import { Canvas, Path } from "@shopify/react-native-skia";
import DirectionButton from "./components/DirectionButton";
import { isKeyExist } from "../utils/asyncStorage";

const { width, height } = Dimensions.get('window');
export default function Test() {
  isKeyExist("story").then(data => console.log(data)) ;
  return (
    <View></View>
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
