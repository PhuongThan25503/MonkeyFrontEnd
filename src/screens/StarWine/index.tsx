import { Button, Image, View } from "react-native";
import { StarWineStyle } from "./style";
import FilterBox from "./FilterBox";
import { useState } from "react";
import DayChoosingPart from "./FilterBox/DayChoosingPart";

export default function StartWine(){
  const [isDisplayFilterBox, setIsDisplayFilterBox] =useState(false);

  return(
    <View style={StarWineStyle.screen}>
      <Image resizeMode="stretch" style={StarWineStyle.mapfake} source={require('../../assets/mapfake.png')}></Image>
      <Button title="Open filter box" onPress={() => setIsDisplayFilterBox(true)}></Button>
      <FilterBox isDisplay={isDisplayFilterBox} setIsDisplay={(state) => setIsDisplayFilterBox(state)}></FilterBox>
    </View>
  )
}