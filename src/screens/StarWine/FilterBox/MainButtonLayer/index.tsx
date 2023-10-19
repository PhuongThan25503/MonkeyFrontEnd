import { View } from "react-native";

import { MainButtonStyle } from "./style";
import TopPart from "./TopPart";

type Props = {
  buttons: JSX.Element,
  title: string
}

export default function MainButtonLayer({ buttons, title }: Props) {
  return (
    <View style={MainButtonStyle.viewWrap}>
      <TopPart title={title}></TopPart>
      <View style={MainButtonStyle.buttonWrap}>
        {buttons}
      </View>
    </View>
  )
}