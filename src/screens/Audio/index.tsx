import { SafeAreaView } from "react-native-safe-area-context";
import Audio from "./Audio";
import { HomeStyle } from "../Home/style";
import NavigateAudioScreens from "./NavigateAudioScreens";
import { StackNavProps } from "../../types";

export default function AudioManagement({navigation} : StackNavProps){
  return(
    <SafeAreaView style={HomeStyle.screen}>
      <NavigateAudioScreens navigation={navigation}></NavigateAudioScreens>
      <Audio></Audio>
    </SafeAreaView>
  )
}