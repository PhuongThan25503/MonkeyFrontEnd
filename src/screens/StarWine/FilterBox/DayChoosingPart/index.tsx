import { useEffect, useState } from "react";

import MainButtonLayer from "../MainButtonLayer";
import MainButton from "../MainButtonLayer/MainButton";
import { View } from "react-native";
import { DayChoosingPartStyle } from "./style";

type Props={
  setChosenDay : (keyname: string, value: number) => void
  chosenDay: {keyname: string, value: number}
}

export default function DayChoosingPart({setChosenDay, chosenDay}: Props) {

  const buttons = (<>
    <MainButton currentChosen={chosenDay?.value} keyname={'today'} value={0} name="Today" setChosen={(key: string, value: number) => setChosenDay(key, value)}></MainButton>
    <MainButton currentChosen={chosenDay?.value} keyname={'tomorrow'} value={1} name="Tomorrow" setChosen={(key: string, value: number) => setChosenDay(key, value)}></MainButton>
    <MainButton currentChosen={chosenDay?.value} keyname={'custom'} value={2} name="Another Date" setChosen={(key: string, value: number) => setChosenDay(key, value)}></MainButton>
  </>
  )

  return (
    <View style={DayChoosingPartStyle.wrapBox}>
      <MainButtonLayer title="Pick a day" buttons={buttons}>
      </MainButtonLayer>
    </View>
  )
}