import React, { useEffect, useRef } from "react";
import { Animated, View, Text as RNText, StyleSheet } from "react-native";
import { jumpAnim } from "../../utils/animation";
import { useAnimatedHighlight, useTextEffect } from "./globalStates/index";
import { wordStyle } from "./style/PageTextStyle";

export default function PageTextLayer({ deviceWidth, mainText, currentMainText }: any) {
  const jumpAnimValue = useRef(new Animated.Value(-10 / 1.5)).current; //animation for highlighting text 
  jumpAnim(jumpAnimValue, -10, 300);
  const textEffectIndex = useTextEffect((state: any) => state.effectIndex);
  const effectOn = useAnimatedHighlight((state: any) => state.effectOn)
  return (
    mainText && mainText.length >0 && <View style={{ position: 'absolute', marginTop: 25, width: deviceWidth, zIndex: 2, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', maxWidth: '60%' }}>
        {
          mainText[currentMainText]?.text.map((mt: string, index: number) =>
          (
            textEffectIndex == index ?
              (
                effectOn ?
                  <Animated.Text key={index} style={StyleSheet.compose(wordStyle.highlighted, { transform: [{ translateY: jumpAnimValue }] })}>{mt} </Animated.Text>
                  : <RNText key={index} style={wordStyle.highlighted}>{mt} </RNText>
              )
              : <RNText key={index} style={wordStyle.default}>{mt} </RNText>
          )
          )
        }
      </View>
    </View >
  )
}


