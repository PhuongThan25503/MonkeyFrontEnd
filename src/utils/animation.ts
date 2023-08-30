import { useRef } from "react";
import { Animated } from "react-native"; 

//basic animation based on from , to , and duration , 
//this will make the animation object change from one value to another value
export const anim = ( anim:Animated.Value, to : number, time : number) => {
  Animated.timing(anim, { 
    toValue:to,
    duration: time,
    useNativeDriver: true,
  }).start();
};

