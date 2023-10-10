import { Animated, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import StoryItem from "../components/Stories/StoryItem";
import { useEffect, useRef, useState } from "react";
import { defaultStory, getAllStory } from "../utils/story";
import { StoryInterface } from "../types";
import { StoryListStyle } from "./styles/StoryListStyle";
import CloudyEffect from "./components/CloudyEffect";
import { anim } from "../utils/animation";
import StoryHeader from "./components/StoryHeader";

export default function StoryList({ route, navigation }: any) {
  const type = route.params.type;
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);
  const cloudMove = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAllStory().then(data => setStory(data));
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
                <StoryItem onPressProp={() => navigation.navigate('StoryDetail', { id: s.story_id })}
                  key={s.story_id}
                  name={s.name}
                  thumbnail={s.thumbnail} author={""} />)
            }
          </View>
        </View>
      </ScrollView>
      <Animated.View style={StyleSheet.compose(StoryListStyle.TopDecor, { transform: [{ translateY: cloudMove }] })}>
        <StoryHeader color={"#90ebfe"} navigation={navigation} title={type} headerRatio={0.25}></StoryHeader>
      </Animated.View>
    </SafeAreaView>
  )
}