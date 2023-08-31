import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryStyle } from "./styles/StoryStyle";
import { defaultStory, getAllStory } from "../utils/story";
import { StoryInterface } from "../types";
import StoryItem from "../components/Stories/StoryItem";

function Story(){
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);

  useEffect(()=>{
    getAllStory().then(data => setStory(data));
  },[])

  return(
    <SafeAreaView>
      <View style={{position:'absolute'}}>
        <Image style={{position:'absolute'}} resizeMode="contain" source={require('../assets/story-background.jpg')}></Image>
      </View>
      <View>
        <Text>Story</Text>
        <View>
            {story.map(s => <StoryItem name={s.name} story_id={s.story_id} thumbnail={s.thumbnail}></StoryItem>)}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Story;

