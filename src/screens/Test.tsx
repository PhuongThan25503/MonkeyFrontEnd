import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import CalendarButton from './StarWine/FilterBox/Calendar';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TimeSlider from './StarWine/FilterBox/TimeSlider';

export default function Test() {

  return (
    <TimeSlider min={900} max={2300}></TimeSlider>
  )

}
const pageViewPositionSlider = {
  trackColor: '#ABABAB',
  thumbColor: '#1411AB',
  style: {
    width: '100%',
  },
};

const styles = StyleSheet.create({
  pagerViewContainer: {
    flex: 1,
  },
  homeScreenContainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    color: pageViewPositionSlider.thumbColor,
    textAlign: 'center',
    width: '100%',
    marginVertical: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
  },
  sliderWidget: {
    marginVertical: 30,
  },
});
