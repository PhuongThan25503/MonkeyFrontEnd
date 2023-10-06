import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StatusBar, Button, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { defaultStory, getAllStory, getAllTypesOfStory } from "../utils/story";
import { RootStackParamList, StoryInterface } from "../types";
import StoryTypeItem from "./components/StoryTypeItem";
import { StoryStyle } from "./styles/StoryStyle";
import StoryItem from "../components/Stories/StoryItem";
import Indicator from "./components/Indicator/Indicator";
import { ItemType } from "./components/StoryTypeItem/Style";
import { Canvas, Path } from "@shopify/react-native-skia";
import DirectionButton from "./components/DirectionButton";
import CloudyEffect from "./components/CloudyEffect";


const CANVAS_RATIO = 0.15;
const CANVAS_RATIO2 = 0.25;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>,
}

function Story({ navigation }: Props) {
  const { width, height } = Dimensions.get('window');
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);
  const [chosenIndex, setChosenIndex] = useState(0);
  const [types, setTypes] = useState<any>([]);  

  useEffect(() => {
    getAllStory().then(data => setStory(data));
    getAllTypesOfStory().then(data => setTypes(data))
  }, [])

  const canMove = (num: number, dir: boolean) => {
    return !(num == 0 && !dir) && !(num == types.length - 1 && dir)
  }

  const handlePress = (dir: boolean) => {
    if (canMove(chosenIndex, dir)) setChosenIndex(prew => prew - (dir ? -1 : 1))
  }
  
  return (
    <SafeAreaView style={StoryStyle.BoundBox}>
      <StatusBar hidden={true}></StatusBar>
      <View style={StoryStyle.SubBoundBox}>
        <View style={StoryStyle.text}>
          <CloudyEffect CANVAS_RATIO2={CANVAS_RATIO2}></CloudyEffect>
          <Text style={StoryStyle.proText}> Choose the kind of story you like </Text>
        </View>
        <View style={StoryStyle.ViewWrap}>
          <View style={ItemType.nonChosenItem}>
            <DirectionButton size={35} color="cyan" dir={false} pressAction={() => handlePress(false)}></DirectionButton>
          </View>
          <StoryTypeItem type={types[chosenIndex]} chosen={true}></StoryTypeItem>
          <View style={ItemType.nonChosenItem}>
            <DirectionButton size={35} color="cyan" dir={true} pressAction={() => handlePress(true)}></DirectionButton>
          </View>
        </View>
        <View style={StoryStyle.IndicatorContainer}>
          <Canvas style={StoryStyle.CanvasContainer}>
            <Path color={'#90ebfe'} path={'M ' + '0 ' + height * CANVAS_RATIO + ' Q ' + width / 2 + ' ' + (-height * CANVAS_RATIO) + ' ' + width + ' ' + height * CANVAS_RATIO + ' Z'}></Path>
          </Canvas>
          <Indicator size={15} color="white" numberOfItem={types.length} currentItem={chosenIndex} ></Indicator>
        </View>
      </View>
    </SafeAreaView>
    // <SafeAreaView>
    //   <View style={{ position: 'absolute' }}>
    //     <Image style={{ position: 'absolute' }} resizeMode="contain" source={require('../assets/story-background.jpg')}></Image>
    //   </View>
    //   <View>
    //     <Text>Story</Text>
    //     <View>
    //       <ScrollView>
    //         {
    //           story?.map(s =>
    //             <StoryItem onPressProp={() => navigation.navigate('IconStory', { id: s.story_id })}
    //             key={s.story_id}
    //             name={s.name}
    //             thumbnail={s.thumbnail} author={""} />)
    //         }
    //       </ScrollView>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
}

export default Story;

