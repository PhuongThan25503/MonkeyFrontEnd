import { View } from "react-native";
import IndicatorItem from "./IndicatorItem";
import { IndicatorStyle } from "./style";
import Octicons from "react-native-vector-icons/Octicons"
type Props = {
  numberOfItem: number,
  currentItem: number,
  color: string,
  size:number
}
export default function Indicator({color, numberOfItem, currentItem ,size}: Props) {
  return (
    <View style={IndicatorStyle.BoundBox}>
      {
        new Array(numberOfItem).fill('').map((a, i) =>
          <IndicatorItem size={size} color={color} chosen={i==currentItem}></IndicatorItem>
        )
      }
    </View>
  )
}