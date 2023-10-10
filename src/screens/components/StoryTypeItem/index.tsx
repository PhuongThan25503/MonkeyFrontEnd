import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemType } from "./Style";
import { useRef } from "react";
import { anim } from "../../../utils/animation";
0
export default function StoryTypeItem({ type, chosen, navigation }: any) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const DURATION = 600;
  anim(rotateAnim, 720, DURATION);
  setTimeout(() => rotateAnim.resetAnimation(), DURATION)

  const handlePress = async () => {
    // await anim(rotateAnim, 720, DURATION);
    // setTimeout(() => rotateAnim.resetAnimation(), DURATION)
    navigation.navigate('StoryList' ,{ type: type.name });
  }

  //for rotaion, must change number to string 
  let spin = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View style={ItemType.ItemStyleBoundCover}>
      <View style={ItemType.ItemStyleBound}>
      <Image resizeMode="contain" style={ItemType.image} source={require('../../../assets/thumbnail1.png')}></Image>
        <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(ItemType.TouchableBound, chosen ? ItemType.ChosenItem : ItemType.nonChosenItem)}>
          <View style={ItemType.textBox}>
            <Text style={ItemType.text}>{type?.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}