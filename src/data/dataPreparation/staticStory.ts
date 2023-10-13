import RNFS from 'react-native-fs';
import axios from 'axios';

import { ASYNC_KEY_PREFIX, IP, SCALE } from "../../config";
import { isKeyExist, saveAsyncData } from "../../utils/asyncStorage";
import { downloadMedia } from '../../utils/story';
import { Dimensions } from 'react-native';
import { stringArrayToPolygonArray, verticlesToPurePath } from '../../screens/IconStory/utils';

const TYPE = "Static_story";

export const getStaticStory = async (id: number) => {
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
    let thumbnailData = await downloadMedia(p.background, TYPE, id, "images", index + '.png');

    //download audio
    let mainText:any[] = [];
    await Promise.all(p.text_config.map(async (pt: any, idx: number) => {
      mainText.push({
        text: JSON.parse(pt.audio.sync_data).map((s: any) => s.w),
        position: pt.position,
        audio: await downloadMedia(pt.audio.audio, TYPE, id, "mainAudios", (index + '' + idx) + '.mp3'),
        syncData: JSON.parse(pt.audio.sync_data),
        duration: pt.audio.duration
      });
    }));

    mainText.sort((a, b) => a.position - b.position);

    //dowload touchable audio
    let touchable:any[] = [];
    let deviceHeight = Dimensions.get('screen').height;
    await Promise.all(p.touch_.map(async (pt: any, idx: number) => {
      touchable.push({
        text: pt.text.text,
        audio: await downloadMedia(pt.text.audio.audio, TYPE, id, "touchableAudios", (index + '_' + idx) + '.mp3'),
        config: pt.config,
        verticles: verticlesToPurePath(pt.data, deviceHeight, SCALE, 0),
      });
    }));
    // console.log(touchable);
    //set touchable
    story.push({
      page: index,
      image: thumbnailData,
      text: mainText, 
      touchable: touchable
    });
  }));
  story.sort((a, b) => a.page - b.page);
  await saveAsyncData(ASYNC_KEY_PREFIX + id, story);
};
