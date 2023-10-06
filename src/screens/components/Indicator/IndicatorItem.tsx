import { View } from "react-native"

import Octicons from "react-native-vector-icons/Octicons"
import { IndicatorStyle } from "./style"
type Props = {
  chosen : boolean
  color: string
  size:number
}



export default function IndicatorItem({color, chosen, size}:Props){
  return(
    <View style={IndicatorStyle.BoundBox}>
      <Octicons style={IndicatorStyle.dotItem} color={color} size={size} name={chosen ? 'dot-fill' : 'dot'}></Octicons>
    </View>
  )
}