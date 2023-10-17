import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getStoryBasicInfoById } from "../../utils/story";
import { RootStackParamList } from "../../types";

import { ItemType } from "../../components/StoryTypeItem/Style";
import { Canvas, Path } from "@shopify/react-native-skia";
import StoryChosenItem from "../../components/StoryChosenItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import StoryHeader from "../../components/StoryHeader";
import { MAINCOLOR } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoryDetailStyle } from "./style";

const CANVAS_RATIO = 0.15;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: any
}

function StoryDetail({ navigation, route }: Props) {
  const { width, height } = Dimensions.get('window');
  const [story, setStory] = useState<any>([]);

  useEffect(() => {
    AsyncStorage.removeItem('Story1');
    getStoryBasicInfoById(route.params.id).then(data => {
      setStory(data)
    });
  }, [])

  return (
    <SafeAreaView style={StoryDetailStyle.BoundBox}>
      <StatusBar hidden={true}></StatusBar>
      <View style={StoryDetailStyle.SubBoundBox}>
        <View style={StoryDetailStyle.text}>
          <StoryHeader color="#90ebfe" navigation={navigation} title={story.name} headerRatio={0.25}></StoryHeader>
        </View>
        <View style={StoryDetailStyle.ViewWrap}>
          <View style={ItemType.nonChosenItem}>
          </View>
          <StoryChosenItem story={story} navigation={navigation}></StoryChosenItem>
          <View style={ItemType.nonChosenItem}>
          </View>
        </View>
        <View style={StoryDetailStyle.IndicatorContainer}>
          <Canvas style={StoryDetailStyle.CanvasContainer}>
            <Path color={MAINCOLOR} path={'M ' + '0 ' + height * CANVAS_RATIO + ' Q ' + width / 2 + ' ' + (-height * CANVAS_RATIO) + ' ' + width + ' ' + height * CANVAS_RATIO + ' Z'}></Path>
          </Canvas>
          <TouchableOpacity onPress={() => { navigation.navigate('Story') }}>
            <Entypo name="home" color={'white'} size={35}></Entypo>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StoryDetail;

