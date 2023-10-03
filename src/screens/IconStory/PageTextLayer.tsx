import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Text as RNText, StyleSheet } from "react-native";
import { jumpAnim, scaleAnim } from "../../utils/animation";
import IconElement from "./components/IconElement";
import { normalizeText, normalizeTextWithoutSpace } from "../../utils/story";

export default function PageTextLayer({ iconData, deviceWidth, mainText, currentMainText, animatedHighlight, wordEffectListener }: any) {
  //array of boolean that difine at which word the highlight effect affected
  const [wordEffect, setWordEffect] = useState<boolean[]>([]);
  //animation for highlighting text 
  const jumpAnimValue = useRef(new Animated.Value(-10 / 1.5)).current;

  jumpAnim(jumpAnimValue, -10, 300);

  useEffect(() => {
    setWordEffect(wordEffectListener);
  }, [wordEffectListener])

  const iconWords = iconData.map((i: any) => normalizeTextWithoutSpace(i.word));

  const syncDuration = mainText[currentMainText]?.syncData.map((m: any) => m.e - m.s); //sync duration for animation

  return (
    <View style={{ position: 'absolute', marginTop: 25, width: deviceWidth, zIndex: 2, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', maxWidth: '60%' }}>
        {
          wordEffect && mainText[currentMainText]?.text.map((mt: string, index: number) =>
          (
            iconWords.indexOf(normalizeTextWithoutSpace(mt)) >= 0 ? (
              syncDuration && wordEffect[index] ? 
                <React.Fragment key={index}>
                  <IconElement Anim={wordEffect[index]} durationAnim={syncDuration[index]} style={{}} IconElement iconData={iconData[iconWords.indexOf(normalizeTextWithoutSpace(mt))]} ></IconElement>
                  {mt.match(/[^A-Za-z0-9]/g)?.pop() != '' ? <RNText style={wordStyle.default}> {mt.match(/[^A-Za-z0-9]/g)?.pop()} </RNText> : ''}
                </React.Fragment>
                :
                <React.Fragment key={index}>
                  <IconElement Anim={wordEffect[index]} durationAnim={syncDuration[index]} style={{}} IconElement iconData={iconData[iconWords.indexOf(normalizeTextWithoutSpace(mt))]} ></IconElement>
                  {mt.match(/[^A-Za-z0-9]/g)?.pop() != '' ? <RNText style={wordStyle.default}> {mt.match(/[^A-Za-z0-9]/g)?.pop()} </RNText> : ''}
                </React.Fragment>
            )
              : (
                wordEffect[index] ?
                  (
                    animatedHighlight ?
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

const wordStyle = StyleSheet.create({
  default: {
    color: 'black',
    fontSize: 25,
    marginTop: 35
  },
  highlighted: {
    color: 'red',
    fontSize: 25,
    marginTop: 35
  },
  icon: {
    backgroundColor: 'aqua',
    padding: 15,
    borderRadius: 20
  }
});

