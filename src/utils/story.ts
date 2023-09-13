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
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getPageDetailById = async (id:number) => {
  try{
    let apiUrl = IP + '/api/getPageById/' +id;
    let response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch(error) {
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

//this will be use to revert from raw_data to supper_raw_data save in database 
const verticlesToPath = (data: string[]) => {
  let xFix =0;
  let output = '';
  data = data.map((d : any, i) => {
    let [a, b] = d.split(',');
    [a, b] = [a.replace(/\D/g, ''), b.replace(/\D/g, '')];
    let newX = (Number(a) - xFix);
    let newY =  Number(b);
    d= [newX, newY];
    output += (newX + ',' + newY + '|');
    return d;
  })
  return {data: data, output: output };
}