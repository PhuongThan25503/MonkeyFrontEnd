import RNFS from 'react-native-fs';

import { ASYNC_KEY_PREFIX, IP } from "../config";
import axios from "axios";
import { PageInterface } from "../types";
import { getAsyncData, isKeyExist, pushAsyncStorage, saveAsyncData } from "./asyncStorage";
import { Alert } from 'react-native';

type touchableData = {
  path: string,
  data: number[]
}
export const getAllStory = async (navigation: any) => {
  try {
    let apiUrl = IP + '/api/getAllStory';
    let response = await axios.get(apiUrl, { timeout: 3000 });
    return response.data;
  } catch (error) {
    navigation.navigate('SavedStory');
    Alert.alert('Bad internet connecttion', 'you are now on offline mode');
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
    if(!isExist) await saveMediaToAsyncStorage(response.data.page, id);
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
    const response = await fetch(url); //fetch file
    const fileName = `${name}`; // set file name
    const path = `${RNFS.DocumentDirectoryPath}/${dir}/${id}/${type}/${fileName}`; //set path
    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${dir}/${id}/${type}`); //made directory
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

export const deleteFolderById = async (dir: string, id: number): Promise<void> => {
  const dirPath = `file://${RNFS.DocumentDirectoryPath}/${dir}/${id}`
  try {
    //remove all files
    await recursiveDeleteFiles(dirPath);
    // await getTotalDirectorySize(dirPath);

    // remove directory
    await RNFS.unlink(dirPath);
  } catch (error: any) {
    console.log(`Error deleting directory: ${error.message}`);
  }
};

export const recursiveDeleteFiles = async (dir:string): Promise<void> =>{
  try {
    const files = await RNFS.readDir(dir);
    await Promise.all(
      files.map(async file => {
        if (file.isDirectory()) {
          return await recursiveDeleteFiles(file.path);
        } else {
          RNFS.unlink(file.path);
        }
      })
    );
  } catch (error: any) {
    console.log(`Error delete directory: ${error.message}`);
  }
}

export const getDirectorySizeArray = async (temp: (number | void)[] = [], dir: string): Promise<void> => {
  try {
    const files = await RNFS.readDir(dir);
    const fileSizes = await Promise.all(
      files.map(async file => {
        if (file.isDirectory()) {
          return await getDirectorySizeArray(temp, file.path);
        } else {
          return file.size;
        }
      })
    );
    temp.push(...fileSizes);
  } catch (error: any) {
    console.log(`Error getting directory size: ${error.message}`);
  }
}

export const getTotalDirectorySize = async (dir: string) => {
  let temp: (number)[] = [];
  await getDirectorySizeArray(temp, dir);
  temp = temp.filter(element => typeof element === 'number');
  let sum=0;
  if(temp.length>0){
    sum = temp.reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return bytesToMegabytes(sum);
}

function bytesToMegabytes(bytes: number): number {
  return Math.round((bytes / (1024 * 1024)) * 10) / 10;
}

export const getPageDetailById = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPageById/' + id;
    let response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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
      let basicInfo = {
        story_id: response.data.story_id,
        type_id: response.data.type_id,
        name: response.data.name,
        author: response.data.author.fullname,
        thumbnail: response.data.thumbnail
      }
      return basicInfo;
    }
    else {
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
    story_id: data.story_id,
    type_id: data.type_id,
    thumbnail: await downloadMedia(data.thumbnail, 'Saved_stories', id, "thumbnail", (id + 'thumbnail_') + '.png'),
    name: data.name
  });

  await isKeyExist('saved_story').then(isExist => {
    if (!isExist) {
      saveAsyncData('saved_story', [storyBasicInfo]);
    } else {
      pushAsyncStorage('saved_story', storyBasicInfo);
    }
  })
}