import { Text, View } from "react-native"
import { CustomMarkerStyle } from "./style"

type Props = {
  value: number
}

export default function CustomSliderMarker({ value }: Props) {
  return (
    <View style={CustomMarkerStyle.bound}>
      <Text style={CustomMarkerStyle.text}>{value}</Text>
    </View>
  )
}