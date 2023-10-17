import { useEffect, useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { StoryInterface } from "../../types";
import { defaultStory, getAllStory } from "../../utils/story";
import { anim } from "../../utils/animation";
import StoryHeader from "../../components/StoryHeader";
import { MAINCOLOR } from "../../config";
import { getAsyncData } from "../../utils/asyncStorage";
import { SavedStoryStyle } from "./style";
import StoryItem from "./SavedItem";
import { StoryItemStyle } from "./SavedItem/style";


export default function SavedStory({ navigation }: any) {
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);
  const cloudMove = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAsyncData('saved_story');
      setStory(JSON.parse(data));
      console.log(data)
    };
    fetchData();
  }, [])

  const onTopAction = () => {
    anim(cloudMove, 0, 200);
  }

  const onScrollDownAction = () => {
    anim(cloudMove, -50, 200);
  }

  const itemData = (item:any) => {
    return (
      <StoryItem
        navigation ={navigation}
        // onPressProp={() => navigation.navigate('StoryDetail', { id: item.story_id })}
        story={item}
      />
    )
  }

  return (
    <SafeAreaView style={SavedStoryStyle.ViewWrap}>
      <FlatList
        contentContainerStyle={{ paddingTop: '10%', paddingLeft: '2%' }}
        style={StoryItemStyle.flatList}
        numColumns={4}
        data={story}
        renderItem={({ item }) => ( 
          itemData(item)
        )}
        keyExtractor={(item) => item.story_id.toString()}
      />
      <Animated.View style={StyleSheet.compose(SavedStoryStyle.TopDecor, { transform: [{ translateY: cloudMove }] })}>
        <StoryHeader color={MAINCOLOR} navigation={navigation} title={'S stories'} headerRatio={0.25}></StoryHeader>
      </Animated.View>
    </SafeAreaView>
  )
}