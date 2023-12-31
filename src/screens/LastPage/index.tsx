import { Animated, Image, StyleSheet, Text, View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { LastPageStyle } from "./LastPageStyle";
import { useEffect, useRef, useState } from "react";

import { MAINCOLOR } from "../../config";
import { scaleAnim } from "../../utils/animation";
import LastPageButton from "./LastPageButton";
import SoundPlayer from "react-native-sound-player";
import { useSaveData } from "../../utils/globalState";
import { removeStoryFromLocalStorage } from "../../utils/DeleteStoryData";

export default function LastPage({ navigation, storyId, setCurrentPageNum }: any) {
  const [coin, setCoin] = useState(0);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const isSavedData = useSaveData((state: any) => state.saveData);

  scaleAnim(scaleValue, 1.2, 100);

  useEffect(() => {
    SoundPlayer.playSoundFile('mario_sound', 'mp3');
  }, [])

  useEffect(() => {
    if (coin < 25) {
      setTimeout(() => { setCoin(coin + 1) }, 50);
    }
    else {
      scaleValue.resetAnimation();
    }
  }, [coin])

  return (
    <View style={LastPageStyle.screen}>
      <LastPageButton onPress={setCurrentPageNum} icon={<Ionicons color={MAINCOLOR} name="reload" size={35}></Ionicons>} />
      <View style={LastPageStyle.coinField}>
        <Animated.View style={StyleSheet.compose(LastPageStyle.coinBound, { transform: [{ scale: scaleValue }] })}>
          <Image style={LastPageStyle.coin} resizeMode="contain" source={require('../../assets/coin.png')}></Image>
        </Animated.View>
        <Text style={LastPageStyle.text}>+{coin}</Text>
      </View>
      <LastPageButton onPress={() => {
        navigation.navigate('StoryList');
        if (!isSavedData) {
          removeStoryFromLocalStorage(storyId);
        }
      }} icon={<Entypo color={MAINCOLOR} name="home" size={35}></Entypo>} />
    </View>
  )
}