import AsyncStorage from "@react-native-async-storage/async-storage";
import { BasicStoryInfo } from "../types";
import { deleteFolderById } from "./story";
import { TYPE } from "../config";

export const removeStoryFromLocalStorage = (story: BasicStoryInfo) => {
  let id = story.story_id;
  //delete in async storage
  AsyncStorage.removeItem('Story' + id);
  removeItemWithStoryId(id);

  //delete in local storage
  deleteFolderById('Saved_stories', id)
  deleteFolderById(TYPE, id)
}

async function removeItemWithStoryId(id: number): Promise<void> {
  try {
    const savedStories = await AsyncStorage.getItem('saved_story');
    let stories = savedStories ? JSON.parse(savedStories) : [];
    stories = stories.filter((story: { story_id: number }) => story.story_id !== id);
    await AsyncStorage.setItem('saved_story', JSON.stringify(stories));
  } catch (error) {
    console.log(error);
  }
}