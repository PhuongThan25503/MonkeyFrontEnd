import { TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CloseButtonStyle } from "./style";

type Props = {
  setIsDisplay : (state : boolean) => void
}

export default function CloseButton({setIsDisplay} : Props) {
  return (
    <TouchableOpacity onPress={() => setIsDisplay(false)}>
      <View style={CloseButtonStyle.box}>
        <AntDesign name="close" size={45}></AntDesign>
      </View>
    </TouchableOpacity>
  )
}