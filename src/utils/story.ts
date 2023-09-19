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

export const getPagesByStoryId = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPagesByStoryId/' + id;
    let response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getPageDetailById = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPageById/' + id;
    let response = await axios.get(apiUrl);
    console.log(response.data);
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

// turn text into normal form
export const normalizeText = (str: string) => {
  // normalize the string using NFC form
  str = str.normalize("NFC");
  // remove any non-alphanumeric characters using a negated character class
  str = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  return str;
}