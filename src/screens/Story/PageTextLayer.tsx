import React, { useEffect, useRef } from "react";
import { Animated, View, Text as RNText, StyleSheet } from "react-native";
import { jumpAnim } from "../../utils/animation";
import { useAnimatedHighlight, useTextEffect } from "./globalStates/index";
import { wordStyle } from "./style/PageTextStyle";
import { normalizeTextWithoutSpace } from "../../utils/story";
import IconElement from "./components/IconElement";

export default function PageTextLayer({ iconData, deviceWidth, mainText, currentMainText }: any) {
  const jumpAnimValue = useRef(new Animated.Value(-10 / 1.5)).current; //animation for highlighting text 
  jumpAnim(jumpAnimValue, -10, 300);
  const textEffectIndex = useTextEffect((state: any) => state.effectIndex);
  const effectOn = useAnimatedHighlight((state: any) => state.effectOn)
  var syncDuration: any[] = [];
  const iconWords = iconData?.map((i: any) => normalizeTextWithoutSpace(i.word));
  if (mainText) {
    syncDuration = mainText[currentMainText]?.syncData.map((m: any) => m.e - m.s); //sync duration for animation
  }

  return (
    mainText && mainText.length > 0 && <View style={wordStyle.boxWrap}>
      <View style={wordStyle.subBoxWrap}>
        {
          mainText[currentMainText]?.text.map((mt: string, index: number) =>
          (
            iconWords && iconWords.indexOf(normalizeTextWithoutSpace(mt)) >= 0 ? (
              <React.Fragment key={index}>
                <IconElement Anim={textEffectIndex == index} durationAnim={syncDuration[index]} iconData={iconData[iconWords.indexOf(normalizeTextWithoutSpace(mt))]} ></IconElement>
                {mt.match(/[^A-Za-z0-9]/g)?.pop() != '' ? <RNText style={wordStyle.default}> {mt.match(/[^A-Za-z0-9]/g)?.pop()} </RNText> : ''}
              </React.Fragment>
            )
              : (
                textEffectIndex == index ?
                  (
                    effectOn ?
                      <Animated.Text key={index} style={StyleSheet.compose(wordStyle.highlighted, { transform: [{ translateY: jumpAnimValue }] })}>{mt} </Animated.Text>
                      : <RNText key={index} style={wordStyle.highlighted}>{mt} </RNText>
                  )
                  : <RNText key={index} style={wordStyle.default}>{mt} </RNText>
              )
          )
          )
        }
      </View>
    </View >
  )
}


