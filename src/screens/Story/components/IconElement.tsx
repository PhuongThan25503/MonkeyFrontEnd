import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconStyle } from "./IconStyle";
import { useEffect, useRef, useState } from "react";
import { anim, scaleAnim } from "../../../utils/animation";
import { playTextAudio } from "../utils";
import { useTouchable } from "../globalStates";

export default function IconElement({ durationAnim, Anim, iconData }: any) {
  const scaleAnimValue = useRef(new Animated.Value(1)).current;
  const scaleAnimValue2 = useRef(new Animated.Value(1)).current;
  const [buttonToggle, setButtonToggle] = useState(true);
  const [displayText, setDisplayText] = useState<boolean>(false);
  const isTouchable = useTouchable((state: any) => state.touchable);
  scaleAnim(scaleAnimValue, 1.2, durationAnim);

  useEffect(()=>{
    setDisplayText(false);
    return() => scaleAnimValue2.resetAnimation();
  },[durationAnim])

  const handlePress = () => {
    if (buttonToggle) {
      anim(scaleAnimValue2, 0.75, 200);
      if (isTouchable) {
        playTextAudio(iconData.sound);
      }
      setDisplayText(true);
    }
    else {
      anim(scaleAnimValue2, 1, 200)
      setDisplayText(false);
    }
    setButtonToggle(!buttonToggle);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={StyleSheet.compose({ width: iconData.image_width * 0.75, height: iconData.image_height * 0.75 }, IconStyle.IconBound)}>
        <Animated.View style={StyleSheet.compose({ width: iconData.image_width * 0.75, height: iconData.image_height * 0.75, transform: [{ scale: Anim ? scaleAnimValue : scaleAnimValue2 }] }, IconStyle.IconTag)}>
          <Image
            resizeMode="contain"
            source={{ uri: iconData.image }}
            style={IconStyle.image}
          />
        </Animated.View>
        {displayText && <Text numberOfLines={1} ellipsizeMode="clip" style={IconStyle.text}>{iconData.word}</Text>}
      </Animated.View>

    </TouchableOpacity>
  )
}