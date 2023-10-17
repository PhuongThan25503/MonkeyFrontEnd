import AsyncStorage from "@react-native-async-storage/async-storage";
import { BasicStoryInfo } from "../types";

export const removeStoryFromLocalStorage = (story: BasicStoryInfo) =>{
  console.log(story);
  AsyncStorage.removeItem('Story'+ story.story_id);
  removeItemWithStoryId(story.story_id);
}

async function removeItemWithStoryId(n: number): Promise<void> {
  try {
    const savedStories = await AsyncStorage.getItem('saved_story');
    let stories = savedStories ? JSON.parse(savedStories) : [];
    stories = stories.filter((story: { story_id: number }) => story.story_id !== n);
    await AsyncStorage.setItem('saved_story', JSON.stringify(stories));
  } catch (error) {
    console.log(error);
  }
}