import React from "react";
import { View } from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { TimeSlideStyle } from "./style";
import CustomSliderMarker from "./CustomSliderMarker";
import { convertToTime } from "../../ultis/getDataHelper";

type Props = {
  min: number,
  max: number,
  setDataSet: (start: number, end: number) => void
}

export default function TimeSlider({ min, max, setDataSet }: Props) {

  const handleRangeChange = (newRange: any) => {
    setDataSet(newRange[0], newRange[1]);
  };

  return (
    <View style={TimeSlideStyle.screen}>
      <MultiSlider
        values={[min, max]}
        onValuesChangeFinish={handleRangeChange}
        isMarkersSeparated={true}
        trackStyle={{backgroundColor: 'gray', height: 3}}
        
        customMarkerLeft={(e) => {
          return (<CustomSliderMarker
            value={convertToTime(e.currentValue)} />)
        }}
        customMarkerRight={(e) => {
          return (<CustomSliderMarker
            value={convertToTime(e.currentValue)} />)
        }}
        min={min}
        max={max}
        step={10}
        allowOverlap={false}
        snapped
      />
    </View>
  );
}