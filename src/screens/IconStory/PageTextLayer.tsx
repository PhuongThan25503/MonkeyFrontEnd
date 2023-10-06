import React, { useRef } from "react";
import { Animated, View, Text as RNText, StyleSheet } from "react-native";
import { jumpAnim } from "../../utils/animation";
import IconElement from "./components/IconElement";
import { normalizeTextWithoutSpace } from "../../utils/story";
import { useAnimatedHighlight, useTextEffect } from "./globalStates/index";
import { wordStyle } from "./style/PageTextStyle";

export default function PageTextLayer({ iconData, deviceWidth, mainText, currentMainText }: any) {
  const jumpAnimValue = useRef(new Animated.Value(-10 / 1.5)).current; //animation for highlighting text 
  jumpAnim(jumpAnimValue, -10, 300);
  const iconWords = iconData?.map((i: any) => normalizeTextWithoutSpace(i.word));
  const textEffectIndex = useTextEffect((state: any) => state.effectIndex);
  const syncDuration = mainText[currentMainText]?.syncData.map((m: any) => m.e - m.s); //sync duration for animation
  const effectOn = useAnimatedHighlight((state: any) => state.effectOn)
  return (
    <View style={{ position: 'absolute', marginTop: 25, width: deviceWidth, zIndex: 2, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', maxWidth: '60%' }}>
        {
          mainText[currentMainText]?.text.map((mt: string, index: number) =>
          (
            iconWords && iconWords.indexOf(normalizeTextWithoutSpace(mt)) >= 0 ? (
              syncDuration && textEffectIndex == index ?
                <React.Fragment key={index}>
                  <IconElement Anim={textEffectIndex == index} durationAnim={syncDuration[index]} style={{}} IconElement iconData={iconData[iconWords.indexOf(normalizeTextWithoutSpace(mt))]} ></IconElement>
                  {mt.match(/[^A-Za-z0-9]/g)?.pop() != '' ? <RNText style={wordStyle.default}> {mt.match(/[^A-Za-z0-9]/g)?.pop()} </RNText> : ''}
                </React.Fragment>
                :
                <React.Fragment key={index}>
                  <IconElement Anim={textEffectIndex == index} durationAnim={syncDuration[index]} style={{}} IconElement iconData={iconData[iconWords.indexOf(normalizeTextWithoutSpace(mt))]} ></IconElement>
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


