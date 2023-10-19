import { Text, TouchableWithoutFeedback, View } from "react-native"

import { MainButtonStyle } from "./style";
import { useEffect, useState } from "react";

type Props = {
  setChosen: (key: string, value: number) => void,
  keyname: string,
  value: number,
  name: string,
  currentChosen: number
}

export default function MainButton({ setChosen, currentChosen, name, keyname, value }: Props) {
  const [chosenValue, setChosenValue] = useState<number>(value);

  const handlePress = () => {
    setChosen(keyname, value);
    setChosenValue(value);
  }

  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      {chosenValue == currentChosen ?
        <View style={MainButtonStyle.chosenWrapBox}>
          <Text style={MainButtonStyle.ChosenButtonText}>{name}</Text>
        </View>
        :
        <View style={MainButtonStyle.wrapBox}>
          <Text style={MainButtonStyle.buttonText}>{name}</Text>
        </View>
      }
    </TouchableWithoutFeedback>
  )
}