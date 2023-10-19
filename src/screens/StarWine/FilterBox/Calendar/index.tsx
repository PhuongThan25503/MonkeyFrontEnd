import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import CalendarView from "./CalendarView";
import { CalendarStyle } from "./CalendarView/style";

type Props = {
  setChosenDay : (keyname: string, value: number, toStringValue: string) => void,
  customDay: string
}

export default function CalendarButton({setChosenDay, customDay} : Props) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setIsDisplayed(true)}>
        <View style={CalendarStyle.boxWrap}>
          <View style={CalendarStyle.boxSubWrap}>
            <Text style={CalendarStyle.text}>
              Choose the date : {customDay}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {isDisplayed ? <CalendarView setChosen={(key: string, value: number, toStringValue: string) => setChosenDay(key, value, toStringValue)} setIsDisplayed={(state: boolean) => setIsDisplayed(state)}></CalendarView> : <></>}
    </React.Fragment>
  )
}