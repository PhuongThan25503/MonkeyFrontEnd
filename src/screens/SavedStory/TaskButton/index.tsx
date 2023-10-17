import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { StoryItemStyle } from "../SavedItem/style";

type Props = {
  text: string,
  color: string,
  icon : JSX.Element,
  onPress: () => void
}

export default function TaskButton({text, color, icon, onPress} : Props) {
  return (
    <TouchableOpacity onPress={onPress} style={StyleSheet.compose( StoryItemStyle.touchBound, {backgroundColor : color} )}>
      {icon}
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}