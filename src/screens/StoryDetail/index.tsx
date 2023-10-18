import React, { useEffect, useState } from "react";
import { View, StatusBar, Dimensions } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

import { getStoryBasicInfoById } from "../../utils/story";

import { Canvas, Path } from "@shopify/react-native-skia";
import StoryChosenItem from "../../components/StoryChosenItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import StoryHeader from "../../components/StoryHeader";
import { MAINCOLOR } from "../../config";
import { StoryDetailStyle } from "./style";

const CANVAS_RATIO = 0.15;

type Props = {
  navigation: any,
  route: any
}

function StoryDetail({ navigation, route }: Props) {
  const { width, height } = Dimensions.get('window');
  const [story, setStory] = useState<any>([]);

  useEffect(() => {
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
        <StoryChosenItem story={story} navigation={navigation}></StoryChosenItem>
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

