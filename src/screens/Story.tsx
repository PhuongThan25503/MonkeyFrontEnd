import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { defaultStory, getAllStory } from "../utils/story";
import { RootStackParamList, StoryInterface } from "../types";
import StoryItem from "../components/Stories/StoryItem";


type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>,
}

function Story({ navigation }: Props) {
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);

  useEffect(() => {
    getAllStory().then(data => setStory(data));
  }, [])

  return (
    <SafeAreaView>
      <View style={{ position: 'absolute' }}>
        <Image style={{ position: 'absolute' }} resizeMode="contain" source={require('../assets/story-background.jpg')}></Image>
      </View>
      <View>
        <Text>Story</Text>
        <View>
          <ScrollView>
            {
              story?.map(s =>
                <StoryItem onPressProp={() => navigation.navigate('StoryDetail', { id: s.story_id })}
                key={s.story_id}
                name={s.name}
                thumbnail={s.thumbnail} author={""} />)
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Story;

