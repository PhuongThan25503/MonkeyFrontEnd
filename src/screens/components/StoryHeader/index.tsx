import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StoryStyle } from "../../styles/StoryStyle";
import CloudyEffect from "../CloudyEffect";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "./BackButton";

type Props = {
  navigation: any,
  headerRatio: number,
  title: string,
  color: string
}

export default function StoryHeader({ navigation, headerRatio, title, color }: Props) {
  return (
    <React.Fragment>
      <CloudyEffect type={'threeCurve'} color={color} CANVAS_RATIO2={headerRatio}></CloudyEffect>
      <Text style={StoryStyle.proText}> {title} </Text>
      <BackButton navigation={navigation} color={color}></BackButton>
    </React.Fragment>
  )
}