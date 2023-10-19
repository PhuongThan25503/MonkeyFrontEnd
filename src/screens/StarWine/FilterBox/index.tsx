import { Image, Text, View } from "react-native";

import { FilterBoxStyle } from "./style";
import CloseButton from "./CloseButton";
import { useEffect, useState } from "react";
import TopPart from "./TopPart";
import DayChoosingPart from "./DayChoosingPart";
import TimeChoosingPart from "./TimeChoosingPart";
import SearchButton from "./SearchButton";
import { DayValueTranform } from "../ultis/dataDictionary";
import { SimpleMarker, dataSetToApiUrl } from "../ultis/getDataHelper";

type Props = {
  isDisplay: boolean,
  setIsDisplay: (state: boolean) => void,
  setListOfMarker: (data: SimpleMarker[]) => void
}

export type DataSet = {
  chosenDay: { keyname: string, value: number, toStringValue: string },
  chosenTime: { keyname: string, value: number },
  timeStart: number,
  timeEnd: number
}

export default function FilterBox({setListOfMarker, isDisplay, setIsDisplay }: Props) {
  // const [chosenDay, setChosenDay] = useState<{keyname: string, value: number}>({keyname: "none", value: -1});
  // const [chosenTime, setChosenTime] = useState<{keyname: string, value: number}>({keyname: "none", value: -1});
  // const [timeRange, setTimeRange] = useState<{start: number, end: number}>({start: 900, end :2300});

  const [dataSet, setDataSet] = useState<DataSet>({
    chosenDay: { keyname: 'today', value: 0, toStringValue: DayValueTranform(0) },
    chosenTime: { keyname: 'open-now', value: 0 },
    timeStart: 900,
    timeEnd: 2300
  })

  useEffect(()=>{
    console.log(dataSet);
  },[dataSet])

  return (
    isDisplay && <View style={FilterBoxStyle.screenBound}>
      <View style={FilterBoxStyle.fadedBackground}>
      </View>
      <View style={FilterBoxStyle.mainBoxBound}>
        <View style={FilterBoxStyle.mainBox}>
          <CloseButton setIsDisplay={() => setIsDisplay(false)}></CloseButton>
          <TopPart title="Filter to see which places are open"></TopPart>
          <DayChoosingPart chosenDay={dataSet.chosenDay} setChosenDay={(keyname: string, value: number) => setDataSet({ ...dataSet, chosenDay: { keyname: keyname, value: value, toStringValue: DayValueTranform(value) } })}></DayChoosingPart>
          <TimeChoosingPart chosenTime={dataSet.chosenTime} setChosenTime={(keyname: string, value: number) => setDataSet({ ...dataSet, chosenTime: { keyname: keyname, value: value } })}></TimeChoosingPart>
          <SearchButton setIsDisplay={(state: boolean) => setIsDisplay(state)} apiUrl={dataSetToApiUrl(dataSet)} setListOfMarker={(data: SimpleMarker[]) => setListOfMarker(data)}></SearchButton>
        </View>
      </View>
    </View>
  )
}