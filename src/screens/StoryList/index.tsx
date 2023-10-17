import { Animated, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import StoryItem from "../../components/Stories/StoryItem";
import { useEffect, useRef, useState } from "react";
import { defaultStory, getAllStory } from "../../utils/story";
import { StoryInterface } from "../../types";
import { StoryListStyle } from "./style";
import { anim } from "../../utils/animation";
import StoryHeader from "../../components/StoryHeader";
import { MAINCOLOR } from "../../config";

export default function StoryList({ navigation }: any) {
  const [story, setStory] = useState<StoryInterface[]>([defaultStory]);
  const cloudMove = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getAllStory().then(data => setStory(data));
  }, [])

  function handleScroll(event:any) {
    const { contentOffset } = event.nativeEvent;
    if(contentOffset.y==0){
      onTopAction()
    }
    if(contentOffset.y > 0 ){
      onScrollDownAction()
    }
  }

  const onTopAction = () => {
    anim(cloudMove, 0, 200);
  }

  const onScrollDownAction = () => {
    anim(cloudMove, -50, 200);
  }

  const itemData = (item:any) => {
    return (
      <StoryItem
        onPressProp={() => navigation.navigate('StoryDetail', { id: item.story_id })}
        name={item.name}
        thumbnail={item.thumbnail}
        author={""}
      />
    )
  }

  return (
    <SafeAreaView style={StoryListStyle.ViewWrap}>
      <StatusBar hidden={true}></StatusBar>
      {/* <ScrollView onScroll={(event) => { if (event.nativeEvent.contentOffset.y === 0) { onTopAction() } else { onScrollDownAction() } }} style={StoryListStyle.ScrollViewBound}>
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
      </ScrollView> */}
      <FlatList
        contentContainerStyle={{ paddingTop: '10%', paddingLeft: '2%' }}
        style={StoryListStyle.flatList}
        numColumns={4}
        data={story}
        onScroll={handleScroll}
        renderItem={({ item }) => ( 
          itemData(item)
        )}
        keyExtractor={(item) => item.story_id.toString()}
      />
      <Animated.View style={StyleSheet.compose(StoryListStyle.TopDecor, { transform: [{ translateY: cloudMove }] })}>
        <StoryHeader color={MAINCOLOR} navigation={navigation} title={'Story list'} headerRatio={0.25}></StoryHeader>
      </Animated.View>
    </SafeAreaView>
  )
}