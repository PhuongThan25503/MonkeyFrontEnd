import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StoryStyle } from "../../styles/StoryStyle";

export default function BackButton({ navigation,color } :any) {
  const handlePress = () => {
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(StoryStyle.backButton, { backgroundColor: color })}>
      <MaterialCommunityIcons name="arrow-u-left-top-bold" size={35} color={'white'}></MaterialCommunityIcons>
    </TouchableOpacity>
  )
}