import { useRef } from "react";
import { Animated, Easing } from "react-native";

//basic animation based on from , to , and duration , 
//this will make the animation object change from one value to another value
export const anim = (anim: Animated.Value, to: number, time: number) => {
  Animated.timing(anim, {
    toValue: to,
    duration: time,
    useNativeDriver: true,
    easing: Easing.ease,
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

export const scaleAnim = (position: Animated.Value, to: number, time: number) => {
  // Create a sequence of four animations
  const sequence = Animated.sequence([
    Animated.timing(position, {
      toValue: to,
      duration: time * 0.5,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
    Animated.timing(position, {
      toValue: 1,
      duration: time * 0.5,
      useNativeDriver: true,
      easing: Easing.ease,
    })
  ]);
  // Loop the sequence indefinitely
  Animated.loop(sequence).start();
}

export const easeInOutAnim = (position: Animated.Value, to: number, time: number, dir: boolean) => {
  // Create a sequence of four animations
  const sequence = Animated.sequence([
    Animated.timing(position, {
      toValue: dir? to : -to,
      duration: time * 0.5,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
    Animated.timing(position, {
      toValue: 1,
      duration: time * 0.5,
      useNativeDriver: true,
      easing: Easing.ease,
    })
  ]);
  // Loop the sequence indefinitely
  Animated.loop(sequence).start();
}

