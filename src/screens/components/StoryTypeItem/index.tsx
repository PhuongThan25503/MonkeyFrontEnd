import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemType } from "./Style";
import { useRef } from "react";
import { anim } from "../../../utils/animation";
0
export default function StoryTypeItem({ types, chosen }: any) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const DURATION = 600;
  anim(rotateAnim, 720, DURATION);
  setTimeout(() => rotateAnim.resetAnimation(), DURATION)
  const handlePress = async () => {
    await anim(rotateAnim, 720, DURATION);
    setTimeout(() => rotateAnim.resetAnimation(), DURATION)
  }
  
  //for rotaion, must change number to string 
  let spin = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(ItemType.ItemStyleBound, chosen ? ItemType.ChosenItem : ItemType.nonChosenItem)}>
      <Animated.View style={StyleSheet.compose(ItemType.ItemStyle, { transform: [{ rotateY: spin }] })}>
        <Image resizeMode="contain" style={ItemType.image} source={require('../../../assets/thumbnail1.png')}></Image>
      </Animated.View>
    </TouchableOpacity>
  )
}