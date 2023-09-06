import { IP } from "../config";
import axios from "axios";
import { PageInterface, StoryInterface } from "../types";

export const getAllStory = async () => {
  try {
    let apiUrl = IP + '/api/getAllStory';
    let response = await axios.get(apiUrl);
    console.log('get all story data');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getPagesByStoryId = async (id : number) => {
  try {
    let apiUrl = IP + '/api/getPagesByStoryId/' + id;
    let response = await axios.get(apiUrl);
    console.log('featched all pages data');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const defaultStory: StoryInterface = {
  story_id: 0,
  author_id: 0,
  type_id: 0,
  name: 'N/A',
  thumbnail: 'N/A',
  coin: 0,
  isActive: false,
  created_at: 'N/A',
  updated_at: 'N/A',
}

export const defaultPage: PageInterface = {
  page_id: 0,
  story_id: 0,
  background: 'N/A',
  page_num: 0,
}