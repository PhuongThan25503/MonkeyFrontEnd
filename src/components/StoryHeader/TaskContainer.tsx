import { Text, TouchableOpacity, View } from "react-native";
import { StoryHeaderStyle } from "./style";

export default function TaskContainer() {

  return (
    <TouchableOpacity>
      <View style={StoryHeaderStyle.task}>
        <Text style={StoryHeaderStyle.text}>Saved story</Text>
      </View>
    </TouchableOpacity>
  )
}