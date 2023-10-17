import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Animated } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import { StoryItemStyle } from "./style";
import TaskButton from "../TaskButton";
import { anim } from "../../../utils/animation";
import { removeStoryFromLocalStorage } from "../../../utils/DeleteStoryData";
import { BasicStoryInfo } from "../../../types";

type Props = {
  story: BasicStoryInfo,
  navigation: any
}

function StoryItem({ story, navigation }: Props) {
  const { width, height } = Dimensions.get('screen');
  const transX = useRef(new Animated.Value(-100)).current;
  const [visible, setVisible] = useState(true);

  let toggle = true;
  const handleMainPress = () => {
    if(toggle){
      anim(transX, 0, 200);
      toggle=false;
    }else{
      anim(transX, -100, 200);
      toggle=true;
    }
  }

  const removingHandler = () =>{
    setVisible(false);
    removeStoryFromLocalStorage(story);
  }
  return (
    visible && <View style={StyleSheet.compose(StoryItemStyle.overOuterBound, { width: width * 0.2, height: height * 0.5 })}>
      <View style={StoryItemStyle.overOuterLayer1}>
        <TouchableOpacity onPress={()=> handleMainPress()} style={StoryItemStyle.button}>
          <View style={StoryItemStyle.overBound}>
            <Image resizeMode="cover" style={StoryItemStyle.image} source={{ uri: story.thumbnail }}></Image>
            <Text style={StoryItemStyle.text}>{story.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={StoryItemStyle.bookMarkWrap}>
        <FontAwesome style={StoryItemStyle.bookMarkIcon} name="bookmark" color={'#90ebfe'} size={35}></FontAwesome>
        <Text style={StoryItemStyle.bookMarkText}>{story?.name?.substring(0, 1)}</Text>
      </View>
      <Animated.View style={StyleSheet.compose( StoryItemStyle.taskStyle, {transform: [{translateX: transX}]} )}>
        <TaskButton color="green" onPress={() => navigation.navigate('StoryDetail', { id: story.story_id })} text="Play" icon={<Entypo name={'controller-play'} size={55}></Entypo>}></TaskButton>
        <TaskButton color="red" onPress={() => removingHandler()} text="Remove" icon={<Ionicons name={'trash-bin'} size={35}></Ionicons>}></TaskButton>
      </Animated.View>
    </View>
  )
}

export default StoryItem;
