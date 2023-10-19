import { Button, Image, View } from "react-native";
import { useEffect, useState } from "react";

import { StarWineStyle } from "./style";
import FilterBox from "./FilterBox";
import MapViewScreen from "./MapViewScreen";
import { SimpleMarker } from "./ultis/getDataHelper";

export default function StartWine() {
  const [isDisplayFilterBox, setIsDisplayFilterBox] = useState(false);
  const [listOfMarker, setListOfMarker] = useState<SimpleMarker[]>([{ lat: 0, lng: 0 }]);

  return (
    <View style={StarWineStyle.screen}>
      <MapViewScreen listOfMarker={listOfMarker}></MapViewScreen>
      <View style={StarWineStyle.buttonBound}>
        <Button title="Open filter box" onPress={() => setIsDisplayFilterBox(true)}></Button>
        <Button title="reset" onPress={() => setListOfMarker([])}></Button>
      </View>
      <FilterBox setListOfMarker={(data: SimpleMarker[]) => setListOfMarker(data)} isDisplay={isDisplayFilterBox} setIsDisplay={(state) => setIsDisplayFilterBox(state)}></FilterBox>
    </View>
  )
}