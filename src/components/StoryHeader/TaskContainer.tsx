import { Text, TouchableOpacity, View } from "react-native";
import { StoryHeaderStyle } from "./style";

type Props = {
  text : string,
  icon : JSX.Element,
  onPress : () => void
}

export default function TaskContainer({text, icon, onPress}: Props) {

  return (
    <TouchableOpacity onPress={onPress} style={StoryHeaderStyle.task}>
        {icon}
        <Text style={StoryHeaderStyle.taskText}>  {text}</Text>
    </TouchableOpacity>
  )
}