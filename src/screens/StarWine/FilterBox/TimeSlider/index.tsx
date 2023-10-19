import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TimeSlideStyle } from "./style";
import CustomSliderMarker from "./CustomSliderMarker";

type Props = {
  min: number,
  max: number
}

export default function TimeSlider({ min, max }: Props) {
  const [range, setRange] = useState([900, 2300]);

  const handleRangeChange = (newRange: any) => {
    setRange(newRange);
    console.log(newRange)
  };

  return (
    <View style={TimeSlideStyle.screen}>
      <MultiSlider
        values={range}
        onValuesChange={handleRangeChange}
        isMarkersSeparated={true}
        trackStyle={{backgroundColor: 'gray', height: 3}}
        customMarkerLeft={(e) => {
          return (<CustomSliderMarker
            value={e.currentValue} />)
        }}
        customMarkerRight={(e) => {
          return (<CustomSliderMarker
            value={e.currentValue} />)
        }}
        min={900}
        max={2300}
        step={10}
        allowOverlap={false}
        snapped
      />
    </View>
  );
}