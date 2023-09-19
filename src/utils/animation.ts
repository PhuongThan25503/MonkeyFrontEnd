import { useRef } from "react";
import { Animated, Easing } from "react-native";

//basic animation based on from , to , and duration , 
//this will make the animation object change from one value to another value
export const anim = (anim: Animated.Value, to: number, time: number) => {
  Animated.timing(anim, {
    toValue: to,
    duration: time,
    useNativeDriver: true,
  }).start();
};

export const jumpAnim = (position: Animated.Value, to: number, time: number) => {
  // Create a sequence of four animations
  const sequence = Animated.sequence([
    // Move up to the target value
    Animated.timing(position, {
      toValue: to,
      duration: time,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
    // Move down to 2/3 of the target value
    Animated.timing(position, {
      toValue: to / 1.5,
      duration: time,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ]);
  // Loop the sequence indefinitely
  Animated.loop(sequence).start();
}
