import { TouchableOpacity, View } from "react-native";
import { LastPageStyle } from "./LastPageStyle";

type Props={
  onPress: (num:number) => void,
  icon: JSX.Element
}

export default function LastPageButton({onPress, icon} :Props) {
  return (
    <View style={LastPageStyle.buttonField}>
      <TouchableOpacity onPress={() =>onPress(0)} style={LastPageStyle.button}>
        {icon}
      </TouchableOpacity>
    </View>
  )
}