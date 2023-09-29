import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import { RootStackParamList, StackNavProps } from "../../types";

export default function NavigateAudioScreens({navigation} : StackNavProps) {
  
  return (
    <View>
      <Button onPress={() => navigation.navigate('AudioUpload')} title='upload Audio'></Button>
      <Button onPress={() => navigation.navigate('TextUpload')} title='upload Text'></Button>
    </View>
  )
}