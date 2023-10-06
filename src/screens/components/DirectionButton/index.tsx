import { Canvas, Path, translate } from "@shopify/react-native-skia"
import { Animated, TouchableOpacity, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { DirectButtonStyle } from "./style"
import { useRef } from "react"
import { easeInOutAnim } from "../../../utils/animation"

type Props = {
  dir: boolean,
  pressAction: () => void,
  size: number,
  color: string
}

export default function DirectionButton({ size, color, dir, pressAction }: Props) {
  const transitionX = useRef(new Animated.Value(0)).current;
  easeInOutAnim(transitionX, 10, 1500, dir);
  return (
    <TouchableOpacity onPress={pressAction} style={DirectButtonStyle.box}>
      <Animated.View style={{transform: [{translateX : transitionX}]}}>
        <FontAwesome size={size} color={color} name={dir ? "arrow-right" : "arrow-left"}></FontAwesome>
      </Animated.View>
    </TouchableOpacity>
  )
}