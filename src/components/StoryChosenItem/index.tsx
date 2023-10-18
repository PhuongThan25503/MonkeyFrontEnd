import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ItemType } from "./style";
import Octicons from "react-native-vector-icons/Octicons";
import DownLoadButton from "./DownLoadButton";

type Props = {
  story: any,
  navigation: any
}

interface TypeNav {
  [key: number]: string
}

const typeNav: TypeNav = {
  1: 'StaticStory',
  2: 'IconStory',
  3: 'IconStory'
}

const typeName: TypeNav = {
  1: 'Static Story',
  2: 'Icon Story',
  3: 'Animated Story'
}

export default function StoryChosenItem({ story, navigation }: Props) {
  const handlePress = async () => {
    navigation.navigate(typeNav[story.type_id], { id: story.story_id });
  }

  return (
    <View style={ItemType.ViewWrap}>
      <View style={ItemType.ViewImage}>
        {story.thumbnail && <Image resizeMode="cover" style={ItemType.image} source={{ uri: story.thumbnail }}></Image>}
      </View>
      <View style={ItemType.infoBound}>
        <View style={ItemType.textBound}>
          <Text style={ItemType.title}>Author: {story.author}</Text>
          <Text style={ItemType.title}>Type: {typeName[story.type_id]}</Text>
        </View>
        <View style={ItemType.buttonBound}>
          <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(ItemType.TouchableBound, ItemType.ChosenItem)}>
            <View style={ItemType.textBox}>
              <Octicons name="play" size={35} color={'white'}></Octicons>
              <Text style={ItemType.text}>PLAY</Text>
            </View>
          </TouchableOpacity>
          <DownLoadButton story={story}></DownLoadButton>
        </View>
      </View>
    </View>
  )
}