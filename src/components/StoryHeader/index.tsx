import React from "react";
import { Text} from "react-native";

import CloudyEffect from "../CloudyEffect";
import BackButton from "./BackButton";
import MenuButton from "./MenuButton";
import { StoryHeaderStyle } from "./style";

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
      <Text style={StoryHeaderStyle.proText}> {title} </Text>
      <BackButton navigation={navigation} color={color}></BackButton>
      <MenuButton navigation={navigation} color={color}></MenuButton>
    </React.Fragment>
  )
}