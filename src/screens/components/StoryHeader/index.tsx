import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StoryStyle } from "../../styles/StoryStyle";
import CloudyEffect from "../CloudyEffect";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  navigation: any,
  headerRatio: number,
  title: string,
  color: string
}

export default function StoryHeader({ navigation, headerRatio, title, color }: Props) {
  const handlePress = () => {
    navigation.goBack();
  }
  return (
    <React.Fragment>
      <CloudyEffect type={'threeCurve'} color={color} CANVAS_RATIO2={headerRatio}></CloudyEffect>
      <Text style={StoryStyle.proText}> {title} </Text>
      <TouchableOpacity onPress={()=> handlePress()} style={StyleSheet.compose(StoryStyle.backButton, { backgroundColor: color })}>
        <MaterialCommunityIcons name="arrow-u-left-top-bold" size={35} color={'white'}></MaterialCommunityIcons>
      </TouchableOpacity>
    </React.Fragment>
  )
}