import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarStyle } from './style';
import { getCurrentDate } from '../../../ultis/getDataHelper';

type Props = {
  setIsDisplayed : (state: boolean) => void
  setChosen: (key: string, value: number, toStringValue: string) => void,
}

export default function CalendarView({ setIsDisplayed, setChosen } : Props) {

  return (
    <View style={CalendarStyle.screenBound}>
      <View style={CalendarStyle.mainBoxBound}>
        <Calendar
          // Customize the appearance of the calendar
          minDate={getCurrentDate()}
          style={{
            height: 350
          }}
          // Specify the current date
          current={getCurrentDate()}
          // Callback that gets called when the user selects a day
          onDayPress={day => {
            setIsDisplayed(false);
            setChosen('custom', 2, day.dateString)
          }}
        />
      </View>
    </View>
  );
};