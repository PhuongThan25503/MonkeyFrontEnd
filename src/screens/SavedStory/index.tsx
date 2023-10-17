import { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { StoryInterface } from "../../types";
import { defaultStory, getAllStory } from "../../utils/story";
import { anim } from "../../utils/animation";
import { StoryListStyle } from "../StoryList/style";
import StoryItem from "../../components/Stories/StoryItem";
import StoryHeader from "../../components/StoryHeader";
import { MAINCOLOR } from "../../config";
import { getAsyncData } from "../../utils/asyncStorage";


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

  return (
    <SafeAreaView style={StoryListStyle.ViewWrap}>
      <ScrollView onScroll={(event) => { if (event.nativeEvent.contentOffset.y === 0) { onTopAction() } else { onScrollDownAction() } }} style={StoryListStyle.ScrollViewBound}>
        <View style={StoryListStyle.subScrollView}>
          <View style={StoryListStyle.ViewBound}>
            {
              story?.map(s =>
                <StoryItem onPressProp={() => navigation.navigate('StoryDetail', { id: s.story_id, type: "Icon story"})}
                  key={s.story_id}
                  name={s.name}
                  thumbnail={s.thumbnail} author={""} />)
            }
          </View>
        </View>
      </ScrollView>
      <Animated.View style={StyleSheet.compose(StoryListStyle.TopDecor, { transform: [{ translateY: cloudMove }] })}>
        <StoryHeader color={MAINCOLOR} navigation={navigation} title={'S stories'} headerRatio={0.25}></StoryHeader>
      </Animated.View>
    </SafeAreaView>
  )
}