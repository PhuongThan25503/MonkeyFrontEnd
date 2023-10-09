import React, { useEffect, useRef } from "react";
import { StoryItemStyle } from "./style/StoryItemStyle";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Canvas from "react-native-canvas";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  name: string,
  thumbnail: string,
  author: string,
  onPressProp: () => void,
}

function StoryItem({ name, thumbnail, onPressProp }: Props) {
  return (
    // <View style={StoryItemStyle.overOuterBound}>
    //   <TouchableOpacity style={StoryItemStyle.button} onPress={() => onPressProp()}>
    //     <View style={StoryItemStyle.overBound}>
    //       <View style={StoryItemStyle.storyItem}>
    //         <Image resizeMode="stretch" style={StoryItemStyle.image} source={{ uri: thumbnail }}></Image>
    //         <View style={StoryItemStyle.infoField}>
    //           <Text style={StoryItemStyle.text}>
    //             {name}
    //           </Text>
    //           <View style={StoryItemStyle.playButton}>
    //             <FontAwesome name='caret-down' style={StoryItemStyle.icon}></FontAwesome>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // </View>
    <View style={StoryItemStyle.overOuterBound}>
      <TouchableOpacity style={StoryItemStyle.button} onPress={() => onPressProp()}>
        <View style={StoryItemStyle.overBound}>
          <Image resizeMode="stretch" style={StoryItemStyle.image} source={{ uri: thumbnail }}></Image>
          <Text style={StoryItemStyle.text}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default StoryItem;
