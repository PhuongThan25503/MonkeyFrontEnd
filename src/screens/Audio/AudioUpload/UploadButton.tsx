import { Text, TouchableOpacity, View } from "react-native";
import AudioFormStyles from "./Style";

type Props ={
  Icons : JSX.Element,
  pressHandler: ()=> void,
}

export default function UploadButton({Icons, pressHandler}:Props) {
  return (
    <TouchableOpacity onPress={() => pressHandler()} style={AudioFormStyles.optionButton}>
      <View>
        <Text style={AudioFormStyles.text}>Upload using direct link</Text>
      </View>
      {Icons}
    </TouchableOpacity>
  )
}