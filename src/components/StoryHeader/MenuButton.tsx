import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StoryHeaderStyle } from "./style";

export default function MenuButton({ navigation, color }: any) {
  const handlePress = () => {
    navigation.navigate('SavedStory')
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(StoryHeaderStyle.menuButton, { backgroundColor: color })}>
        <MaterialCommunityIcons name="menu" size={25} color={'white'}></MaterialCommunityIcons>
      </TouchableOpacity>
      {/* <View style={StoryStyle.taskContainer}>
        <TaskContainer></TaskContainer>
      </View> */}
    </React.Fragment>
  )
}