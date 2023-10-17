import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemType } from "./Style";
import { useRef } from "react";
import { anim } from "../../utils/animation";
import Octicons from "react-native-vector-icons/Octicons";

type Props = {
  story : any,
  navigation :any
}

interface TypeNav {
  [key: number] : string
}

const typeNav: TypeNav = {
  1: 'StaticStory',
  2: 'IconStory',
  3: 'IconStory'
}

export default function StoryChosenItem({ story, navigation }: Props) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const DURATION = 600;
  anim(rotateAnim, 720, DURATION);
  setTimeout(() => rotateAnim.resetAnimation(), DURATION)

  const handlePress = async () => {
    navigation.navigate(typeNav[story.type_id], { id: story.story_id });
  }

  return (
    <View style={ItemType.ItemStyleBoundCover}>
      <View style={ItemType.ItemStyleBound}>
        {story.thumbnail && <Image resizeMode="cover" style={ItemType.image} source={{ uri: story.thumbnail }}></Image>}
        <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(ItemType.TouchableBound, ItemType.ChosenItem)}>
          <View style={ItemType.textBox}>
            <Octicons name="play" size={35} color={'white'}></Octicons>
            <Text style={ItemType.text}>PLAY</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}