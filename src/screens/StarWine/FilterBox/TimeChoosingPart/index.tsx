import MainButtonLayer from "../MainButtonLayer";
import MainButton from "../MainButtonLayer/MainButton";
import { View } from "react-native";
import { DayChoosingPartStyle } from "../DayChoosingPart/style";

type Props={
  setChosenTime : (keyname: string, value: number) => void
  chosenTime: {keyname: string, value: number}
}

export default function TimeChoosingPart({setChosenTime, chosenTime}: Props) {

  const buttons = (<>
    <MainButton currentChosen={chosenTime?.value} keyname="open-now" value={0} name="Open now" setChosen={(key: string, value: number) => setChosenTime(key, value)}></MainButton>
    <MainButton currentChosen={chosenTime?.value} keyname="lunch" value={1} name="Lunch" setChosen={(key: string, value: number) => setChosenTime(key, value)}></MainButton>
    <MainButton currentChosen={chosenTime?.value} keyname="dinner" value={2} name="Dinner" setChosen={(key: string, value: number) => setChosenTime(key, value)}></MainButton>
    <MainButton currentChosen={chosenTime?.value} keyname="custom" value={3} name="Choose your time" setChosen={(key: string, value: number) => setChosenTime(key, value)}></MainButton>
  </>
  )

  return (
    <View style={DayChoosingPartStyle.wrapBox}>
      <MainButtonLayer title="Pick a time" buttons={buttons}>
      </MainButtonLayer>
    </View>
  )
}