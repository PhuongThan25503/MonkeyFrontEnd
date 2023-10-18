import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useRef } from "react";
import { StoryHeaderStyle } from "./style";
import TaskContainer from "./TaskContainer";
import { anim } from "../../utils/animation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MenuButton({ navigation, color }: any) {
  const {width, height} = Dimensions.get('window')
  const transX = useRef(new Animated.Value(width * 0.5)).current;
  let toggle = true;
  const handlePress = () => {
    // navigation.navigate('SavedStory')
    if(toggle){
      anim(transX, 0, 200);
      toggle = false;
    }
    else{
      anim(transX, width * 0.5, 200);
      toggle=true;
    }
  }

  return (
    <View style={StoryHeaderStyle.buttonBound}>
      <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(StoryHeaderStyle.menuButton, { backgroundColor: color })}>
        <MaterialCommunityIcons name="menu" size={25} color={'white'}></MaterialCommunityIcons>
      </TouchableOpacity>
      <Animated.View style={StyleSheet.compose(StoryHeaderStyle.taskContainer, {transform:[{translateX : transX}]})}>
        <TaskContainer onPress={()=>navigation.navigate('SavedStory')} text={'Saved stories'} icon={<MaterialIcons name="cloud-download" size={25}></MaterialIcons>}></TaskContainer>
        <TaskContainer onPress={()=>navigation.navigate('Setting')} text={'Settings'} icon={<Ionicons name="settings-sharp" size={25}></Ionicons>}></TaskContainer>
      </Animated.View>
    </View>
  )
}