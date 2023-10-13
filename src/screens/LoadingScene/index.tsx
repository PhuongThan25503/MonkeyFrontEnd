import { useEffect, useRef, useState } from "react";

import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LoadingStyle } from "./style";
import { LoadingAnim, anim } from "../../utils/animation";
import { useIsDownloaded } from "./store";
type Props = {
  isLoading: boolean
}

export default function LoadingScene({ isLoading }: Props) {
  const width = Dimensions.get('window').width;
  const runProgressWidth = useRef(new Animated.Value(-width * 0.85)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const percentage = useRef(0);
  const setIsLoaded = useIsDownloaded((state: any) => state.setIsDownloaded)
  const [switcher, setSwitcher] = useState(false);

  if (isLoading) {
    LoadingAnim(runProgressWidth, -width * 0.85, -width * 0.05, 5000);
  } else {
    anim(runProgressWidth, 0, 1000);
  }



  runProgressWidth.addListener(({ value }) => {
    if (Math.round(value * 100) % 23 == 0) {
      if (Math.round(((width + value) / width) * 100) == 100) {
        setSwitcher(true);
      }
    }
  });

  useEffect(() => {
    if (switcher) {
      setTimeout(() => setIsLoaded(true), 1000);
      anim(fade, 0, 1000);
    }
  }, [switcher])

  return (
    <Animated.View style={StyleSheet.compose(LoadingStyle.screen, { opacity: fade })}>
      <View style={LoadingStyle.top}></View>
      <View style={LoadingStyle.mid}>
        <View style={LoadingStyle.imageBound}>
          <Image resizeMode="contain" style={LoadingStyle.image} source={require('../../assets/monkeyIcon.png')}></Image>
        </View>
      </View>
      <View style={LoadingStyle.bottom}>
        <View style={LoadingStyle.progressBar}>
          <Animated.View style={StyleSheet.compose(LoadingStyle.runProgress, { transform: [{ translateX: runProgressWidth }] })}></Animated.View>
        </View>
      </View>
    </Animated.View>
  )
}