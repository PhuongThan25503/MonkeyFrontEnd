import { Text, TouchableWithoutFeedback, View } from "react-native"

import { MainButtonStyle } from "./style";
import { useSaveData } from "../../../utils/globalState";

type Props = {
  currentStatus: boolean,
  name: string
}

export default function MainButton({ currentStatus, name }: Props) {
  const setIsSave = useSaveData((state: any) => state.setSavedData)
  const handlePress = () => {
    setIsSave(!currentStatus);
  }

  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      {currentStatus ?
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