import { ASYNC_KEY_PREFIX, IP } from "../config";
import axios from "axios";
import { BasicStoryInfo, PageInterface, StoryInterface, touchableMediaData } from "../types";
import RNFS from 'react-native-fs';
import { getAsyncData, isKeyExist, pushAsyncStorage, saveAsyncData } from "./asyncStorage";

type touchableData = {
  path: string,
  data: number[]
}
export const getAllStory = async () => {
  try {
    let apiUrl = IP + '/api/getAllStory';
    let response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllTypesOfStory = async () => {
  try {
    let apiUrl = IP + '/api/getAllType';
    let response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getPagesByStoryId = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPagesByStoryId/' + id;
    let response = await axios.get(apiUrl);
    const isExist = await isKeyExist(ASYNC_KEY_PREFIX + id);
    //if(!isExist) await saveMediaToAsyncStorage(response.data.page, id);
    await saveMediaToAsyncStorage(response.data.page, 32);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const saveMediaToAsyncStorage = async (pages: any, id: number) => {
  let story: any[] = [];
  await Promise.all(pages.map(async (p: any, index: number) => {
    //thumbnail
    let thumbnailData = await downloadMedia(p.background, "story", id, "images", index + '.png');
    let mainAudios: any[] = [];

    //download audio
    await Promise.all(p.text_config.map(async (pt: any, idx: number) => {
      mainAudios.push({
        text_id: pt.text_id,
        position: pt.position,
        audio: await downloadMedia(pt.audio.audio, "story", id, "mainAudios", (index + '' + idx) + '.mp3'),
        syncData: JSON.parse(pt.audio.sync_data)
      });
    }));

    mainAudios.sort((a, b) => a.position - b.position);

    //dowload touchable audio


    //set touchable
    story.push({
      page: index,
      image: thumbnailData,
      text: p.text_config.map((pt: any) => ({
        text_id: pt.text_id,
        audio: mainAudios,
        syncData: JSON.parse(pt.audio.sync_data)
      })),
      touchable: p.touch_.map((pt: any) => ({
        text: pt.text.text,
        audio: pt.text.audio.audio,
      }))
    });
  }));
  story.sort((a, b) => a.page - b.page);
  await saveAsyncData(ASYNC_KEY_PREFIX + id, story);
};


export const downloadMedia = async (url: string, dir: string, id: number, type: string, name: string) => {
  try {
    const response = await fetch(url);
    const fileName = `${name}`;
    const path = `${RNFS.DocumentDirectoryPath}/${dir}/${id}/${type}/${fileName}`;
    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${dir}/${id}/${type}`);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = (reader.result as string).split(',')[1];
      await RNFS.writeFile(path, base64data, 'base64');
    };
    return "file://" + path;
  } catch (error) {
    console.log(error);
  }
};

export const getPageDetailById = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPageById/' + id;
    let response = await axios.get(apiUrl);
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
  if (!str) {
    return '';
  }
  // normalize the string using NFC form
  str = str.normalize("NFC");
  // remove any non-alphanumeric characters using a negated character class
  str = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  return str;
}

export const normalizeTextWithoutSpace = (str: string) => {
  if (!str) {
    return '';
  }
  // normalize the string using NFC form
  str = str.normalize("NFC");
  // remove any non-alphanumeric characters using a negated character class
  str = str.replace(/[^A-Za-z0-9 ]/g, "").toLowerCase();

  return str;
}

/** change raw data to number array and string path **/
export const verticlesToPath = (data: string[], height: number, scale: number, xFix: number): touchableData => {
  height = Math.round(height / scale);
  let output = '';
  let newData: number[] = data?.map((d: any, i: number) => { //data in array of number
    let [a, b] = d.split(',');
    [a, b] = [a.replace(/\D/g, ''), b.replace(/\D/g, '')]; //change '{a,b}' to [a,b]
    let newX = (Number(a) - xFix); //config x depend on screen
    let newY = (height - Number(b)); //config y depend on screen
    d = [newX, newY];
    output += (i == 0 ? 'M ' + newX + ' ' + newY : ' L ' + newX + ' ' + newY); //path
    return d; //element of array number
  })
  return { data: newData, path: output + ' Z' };
}

export function replaceWord(sentence: string, words: string[], replacedBy: string) {
  const pattern = new RegExp(words.join('|'), 'g');
  return sentence.replace(pattern, replacedBy);
}

export async function getStoryBasicInfoById(id: number) {
  try {
    const isExist = await isKeyExist(ASYNC_KEY_PREFIX + id);
    if (!isExist) {
      let apiUrl = IP + '/api/getStoryById/' + id;
      let response = await axios.get(apiUrl);
      return response.data;
    }
    else{
      const data = await getAsyncData(ASYNC_KEY_PREFIX + id);
      return (JSON.parse(data).basicInfo);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveStoryInfo(id: number) {
  let storyBasicInfo: any = [];
  await getStoryBasicInfoById(id).then(async data => storyBasicInfo = {
    story_id : data.story_id,
    type_id : data.type_id,
    thumbnail: await downloadMedia(data.thumbnail, 'Saved_stories', id, "thumbnail", (id + 'thumbnail_') + '.png'),
    name: data.name
  });

  isKeyExist('saved_story').then(isExist => {
    if (!isExist) {
      console.log('non exist')
      saveAsyncData('saved_story', [storyBasicInfo]);
    } else {
      console.log('exist')
      pushAsyncStorage('saved_story', storyBasicInfo);
    }
  })
}