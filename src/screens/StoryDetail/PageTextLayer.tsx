import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Text as RNText, StyleSheet } from "react-native";
import { jumpAnim } from "../../utils/animation";

export default function PageTextLayer({ deviceWidth, mainText, currentMainText, animatedHighlight, wordEffectListener }: any) {
  //array of boolean that difine at which word the highlight effect affected
  const [wordEffect, setWordEffect] = useState<boolean[]>([]);
  //animation for highlighting text 
  const jumpAnimValue = useRef(new Animated.Value(-10 / 1.5)).current;

  jumpAnim(jumpAnimValue, -10, 300);

  useEffect(() => {
    setWordEffect(wordEffectListener);
  }, [wordEffectListener])

  return (
    <View style={{ position: 'absolute', width: deviceWidth, zIndex: 2, alignItems: 'center'}}>
      <View style={{ flexDirection: 'row' , flexWrap:'wrap', maxWidth: '60%'}}>
        {
          wordEffect && mainText[currentMainText]?.text.map((mt: string, index: number) => (
            wordEffect[index] ?
              (animatedHighlight ?
                <Animated.Text key={index} style={StyleSheet.compose(wordStyle.highlighted, { transform: [{ translateY: jumpAnimValue }] })}>{mt} </Animated.Text>
                : <RNText key={index} style={wordStyle.highlighted}>{mt} </RNText>
              )
              : <RNText key={index} style={wordStyle.default}>{mt} </RNText>
          )
          )
        }
      </View>
    </View>
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

