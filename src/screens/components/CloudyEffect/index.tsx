import React from "react";
import { useRef } from "react";
import { Animated, Button, Dimensions, Easing } from "react-native";

import { Canvas, Path, runSpring, runTiming, useValue } from "@shopify/react-native-skia";
import { StoryStyle } from "../../styles/StoryStyle";

type Props = {
  CANVAS_RATIO2: number
}
export default function CloudyEffect({ CANVAS_RATIO2 }: Props) {
  const { width, height } = Dimensions.get('window');
  const pathA = useRef(new Animated.Value(height * CANVAS_RATIO2 * 1.7)).current;
  const pathB = useRef(new Animated.Value(height * CANVAS_RATIO2 * 1.8)).current;
  const pathC = useRef(new Animated.Value(height * CANVAS_RATIO2 * 1.7)).current;

  return (
    <React.Fragment>
      <Canvas style={StoryStyle.CanvasContainer}>
        <Path color={'#90ebfe'} path={'M ' + '0 0' + ' Q ' + width / 3.5 + ' ' + (height * CANVAS_RATIO2 * 1.7) + ' ' + width / 2 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={StoryStyle.CanvasContainer}>
        <Path color={'#90ebfe'} path={'M ' + width / 3.5 + ' 0' + ' Q ' + width / 2 + ' ' + (height * CANVAS_RATIO2 * 1.8) + ' ' + width / 1.25 + ' ' + '0' + ' Z'}></Path>
      </Canvas>
      <Canvas style={StoryStyle.CanvasContainer}>
        <Path color={'#90ebfe'} path={'M ' + width / 2 + ' 0' + ' Q ' + width / 1.25 + ' ' + (height * CANVAS_RATIO2 * 1.7) + ' ' + width + ' ' + '0' + ' Z'}></Path>
      </Canvas>
    </React.Fragment>
  )
}