import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StoryHeaderStyle } from "./style";
import SoundPlayer from "react-native-sound-player";

export default function BackButton({ navigation,color } :any) {
  const handlePress = () => {
    SoundPlayer.stop();
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(StoryHeaderStyle.backButton, { backgroundColor: color })}>
      <MaterialCommunityIcons name="arrow-u-left-top-bold" size={35} color={'white'}></MaterialCommunityIcons>
    </TouchableOpacity>
  )
}