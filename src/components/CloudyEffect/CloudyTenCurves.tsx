import React from "react";
import { Dimensions} from "react-native";

import { Canvas, Path } from "@shopify/react-native-skia";
import { CloudStyle } from "./style";

type Props = {
  CANVAS_RATIO2: number
  color: string
}
export default function CloudyTenCurve({color, CANVAS_RATIO2 }: Props) {
  const { width, height } = Dimensions.get('window');

  return (
    <React.Fragment>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + '0 0' + ' Q ' + width / 3.5 + ' ' + (height * CANVAS_RATIO2 * 1.7) + ' ' + width / 2 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + width / 3.5 + ' 0' + ' Q ' + width / 2 + ' ' + (height * CANVAS_RATIO2 * 1.8) + ' ' + width / 1.25 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + width / 2 + ' 0' + ' Q ' + width / 1.25 + ' ' + (height * CANVAS_RATIO2 * 1.7) + ' ' + width + ' ' + '0' + ' Z'}></Path>
      </Canvas>
    </React.Fragment>
  )
}