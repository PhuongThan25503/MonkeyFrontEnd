import { Text, View } from "react-native"
import { TopPartStyle } from "./style"



type Props = {
  title: string
}

export default function TopPart({title}: Props){
  return(
    <View style={TopPartStyle.viewWrap}>
      <Text style={TopPartStyle.Text}>{title}</Text>
    </View>
  )
}