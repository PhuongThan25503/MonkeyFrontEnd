import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import StoryItem from "../components/Stories/StoryItem";
import { useEffect, useState } from "react";
import { defaultStory, getAllStory } from "../utils/story";
import { StoryInterface } from "../types";
import { StoryListStyle } from "./styles/StoryListStyle";
import CloudyEffect from "./components/CloudyEffect";

export default function StoryList({type, navigation }: any) {
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);
  useEffect(() => {
    getAllStory().then(data => setStory(data));
  }, [])

  return (
    <SafeAreaView style={StoryListStyle.ViewWrap}>
      <CloudyEffect color='#90ebfe' CANVAS_RATIO2={0.25} type="tenCurve"></CloudyEffect>
      <ScrollView style={StoryListStyle.ScrollViewBound}>
        <View style={StoryListStyle.ViewBound}>
          {
            story?.map(s =>
              <StoryItem onPressProp={() => navigation.navigate('IconStory', { id: s.story_id })}
                key={s.story_id}
                name={s.name}
                thumbnail={s.thumbnail} author={""} />)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}