import React from "react";

import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StoryItemStyle } from "./style";

type Props = {
  name: string,
  thumbnail: string,
  author: string,
  onPressProp: () => void,
}

function StoryItem({ name, thumbnail, onPressProp }: Props) {
  const {width, height} = Dimensions.get('screen');
  return (
    <View style={StyleSheet.compose(StoryItemStyle.overOuterBound, {width: width *0.2, height:height * 0.5})}> 
      <View style={StoryItemStyle.overOuterLayer1}>
        <TouchableOpacity style={StoryItemStyle.button} onPress={() => onPressProp()}>
          <View style={StoryItemStyle.overBound}>
            <Image resizeMode="cover" style={StoryItemStyle.image} source={{ uri: thumbnail }}></Image>
            <Text style={StoryItemStyle.text}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={StoryItemStyle.bookMarkWrap}>
        <FontAwesome style={StoryItemStyle.bookMarkIcon} name="bookmark" color={'#90ebfe'} size={35}></FontAwesome>
        <Text style={StoryItemStyle.bookMarkText}>{name.substring(0,1)}</Text>
      </View>
    </View>
  )
}

export default StoryItem;
