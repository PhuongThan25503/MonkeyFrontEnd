import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconStyle } from "./IconStyle";
import { useRef, useState } from "react";
import { anim, scaleAnim } from "../../../utils/animation";

export default function IconElement({ durationAnim, Anim, iconData }: any) {
  const scaleAnimValue = useRef(new Animated.Value(1)).current;
  const scaleAnimValue2 = useRef(new Animated.Value(1)).current;
  const [buttonToggle, setButtonToggle] = useState(true);
  const [displayText, setDisplayText] = useState<'none' | 'flex' | undefined>('none');

  scaleAnim(scaleAnimValue, 1.2, durationAnim);
  const handlePress = () => {
    if (buttonToggle) {
      anim(scaleAnimValue2, 0.75, 200)
      setDisplayText('flex');
    }
    else {
      anim(scaleAnimValue2, 1, 200)
      setDisplayText('none');
    }
    setButtonToggle(!buttonToggle);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {
        Anim ?
          <Animated.View style={StyleSheet.compose({ width: iconData.image_width, height: iconData.image_height }, IconStyle.IconBound)}>
            <Animated.View style={StyleSheet.compose({ width: iconData.image_width, height: iconData.image_height, transform: [{ scale: scaleAnimValue }] }, IconStyle.IconTag)}>
              <Image
                resizeMode="contain"
                source={iconData.imageLocal}
                style={IconStyle.image}
              />
            </Animated.View>
          </Animated.View>
          :
          <Animated.View style={StyleSheet.compose({ width: iconData.image_width, height: iconData.image_height }, IconStyle.IconBound)}>
            <Animated.View style={StyleSheet.compose({ width: iconData.image_width, height: iconData.image_height, transform: [{ scale: scaleAnimValue2 }] }, IconStyle.IconTag)}>
              <Image
                resizeMode="contain"
                source={iconData.imageLocal}
                style={IconStyle.image}
              />
            </Animated.View>
            <Text numberOfLines={1} ellipsizeMode="clip" style={StyleSheet.compose(IconStyle.text, { display: displayText })}>{iconData.word}</Text>
          </Animated.View>
      }
    </TouchableOpacity>
  )
}