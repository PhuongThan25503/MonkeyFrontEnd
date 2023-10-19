import { Image, Text, View } from "react-native";

import { FilterBoxStyle } from "./style";
import CloseButton from "./CloseButton";
import { useEffect, useState } from "react";
import TopPart from "./TopPart";
import DayChoosingPart from "./DayChoosingPart";
import TimeChoosingPart from "./TimeChoosingPart";
import SearchButton from "./SearchButton";

type Props ={
  isDisplay : boolean,
  setIsDisplay : (state: boolean) => void,
}

export default function FilterBox({isDisplay, setIsDisplay} : Props) {
  const [chosenDay, setChosenDay] = useState<{keyname: string, value: number}>({keyname: "none", value: -1});
  const [chosenTime, setChosenTime] = useState<{keyname: string, value: number}>({keyname: "none", value: -1});

  useEffect(()=>{
    console.log(chosenDay);
    console.log(chosenTime);
  },[chosenDay, chosenTime])

  return (
    isDisplay && <View style={FilterBoxStyle.screenBound}>
      <View style={FilterBoxStyle.fadedBackground}>
      </View>
      <View style={FilterBoxStyle.mainBoxBound}>
        <View style={FilterBoxStyle.mainBox}>
          <CloseButton setIsDisplay={() => setIsDisplay(false)}></CloseButton>
          <TopPart title="Filter to see which places are open"></TopPart>
          <DayChoosingPart chosenDay={chosenDay} setChosenDay={(keyname: string, value: number) => setChosenDay({keyname: keyname, value: value})}></DayChoosingPart>
          <TimeChoosingPart chosenTime={chosenTime} setChosenTime={(keyname: string, value: number) => setChosenTime({keyname: keyname, value: value})}></TimeChoosingPart>
        </View>
      </View>
      <SearchButton onPress={() => {}}></SearchButton>
    </View>
  )
}