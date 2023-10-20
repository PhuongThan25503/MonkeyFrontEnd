import { SafeAreaView, StatusBar, View } from "react-native";
import MainButton from "./MainButton";
import { useSaveData } from "../../utils/globalState";
import StoryHeader from "../../components/StoryHeader";
import { StoryDetailStyle } from "../StoryDetail/style";
import { useEffect } from "react";

export default function Setting({ navigation }: any) {
  const isSave = useSaveData((state: any) => state.saveData)
  useEffect(()=>{

  },[isSave])
  
  return (
    <SafeAreaView style={StoryDetailStyle.BoundBox}>
      <StatusBar hidden={true}></StatusBar>
      <View style={StoryDetailStyle.SubBoundBox}>
        <View style={StoryDetailStyle.text}>
          <StoryHeader color="#90ebfe" navigation={navigation} title={"Setting"} headerRatio={0.25}></StoryHeader>
        </View>
        <MainButton currentStatus={isSave} name={`Save story after playing : ${isSave ? "ON" : "OFF"}`}></MainButton>
      </View>
    </SafeAreaView>

  )
}