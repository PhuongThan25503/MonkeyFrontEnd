import React from "react";
import { Dimensions} from "react-native";

import { Canvas, Path } from "@shopify/react-native-skia";
import { CloudStyle } from "./style";
import { HEIGHT, WIDTH } from "../../config";

type Props = {
  CANVAS_RATIO2: number
  color: string
}

export default function CloudyTenCurve({color, CANVAS_RATIO2 }: Props) {


  return (
    <React.Fragment>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + '0 0' + ' Q ' + WIDTH / 3.5 + ' ' + (HEIGHT * CANVAS_RATIO2 * 1.7) + ' ' + WIDTH / 2 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + WIDTH / 3.5 + ' 0' + ' Q ' + WIDTH / 2 + ' ' + (HEIGHT * CANVAS_RATIO2 * 1.8) + ' ' + WIDTH / 1.25 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={CloudStyle.CanvasContainer}>
        <Path color={color} path={'M ' + WIDTH / 2 + ' 0' + ' Q ' + WIDTH / 1.25 + ' ' + (HEIGHT * CANVAS_RATIO2 * 1.7) + ' ' + WIDTH + ' ' + '0' + ' Z'}></Path>
      </Canvas>
    </React.Fragment>
  )
}