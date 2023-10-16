import axios from 'axios';

import { ASYNC_KEY_PREFIX, IP, SCALE } from "../../config";
import { isKeyExist, saveAsyncData } from "../../utils/asyncStorage";
import { downloadMedia } from '../../utils/story';
import { Dimensions } from 'react-native';
import { stringArrayToPolygonArray, stringObjectToArray, verticlesToPurePath } from '../../screens/IconStory/utils';
import { IconizeSyncData } from '../../screens/IconStory/utils';

const TYPE = "Static_story";

export const getIconStory = async (id: number) => {
  try {
    let apiUrl = IP + '/api/getPagesByStoryId/' + id;
    let response = await axios.get(apiUrl);
    const isExist = await isKeyExist(ASYNC_KEY_PREFIX + id);
    if (!isExist) await saveMediaToAsyncStorage(response.data.page, id);
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

    //dowload touchable audio and make a iconList
    let touchable: any[] = [];
    let iconList: any[] = [];
    let deviceHeight = Dimensions.get('screen').height;
    await Promise.all(p.touch_.map(async (pt: any, idx: number) => {
      let audioIcon = await downloadMedia(pt.text.audio.audio, TYPE, id, "touchableAudios", (index + '_' + idx) + '.mp3');
      touchable.push({
        text: pt.text.text,
        audio: audioIcon,
        config: pt.config,
        verticles: verticlesToPurePath(pt.data, deviceHeight, SCALE, 0),
      });
      let size = JSON.parse(pt.text.icon_size);
      iconList.push({
        image_width: size[0],
        image_height: size[1],
        word: pt.text.text,
        image: await downloadMedia(pt.text.icon, TYPE, id, "icon_images", (index + '_' + idx) + '.png'),
        sound: audioIcon,
      })
    }));

    //download audio and iconize data
    let mainText: any[] = [];
    //let iconList = IconData[index].map(i => i.word?.split(' ') || []);

    await Promise.all(p.text_config.map(async (pt: any, idx: number) => {
      let textArray = IconizeSyncData(JSON.parse(pt.audio.sync_data), iconList);
      mainText.push({
        text: textArray.map((s: any) => s.w),
        position: pt.position,
        audio: await downloadMedia(pt.audio.audio, TYPE, id, "mainAudios", (index + '' + idx) + '.mp3'),
        syncData: textArray,
        duration: pt.audio.duration
      });
    }));

    mainText.sort((a, b) => a.position - b.position);

    // detail image: 
    let detailImage:any;
    if(p.image) {
      detailImage= {
        position: stringObjectToArray(p.image.position, 0),
        size: stringObjectToArray(p.image.size, 0),
        image: await downloadMedia(p.image.image, TYPE, id, "detail_images", (index + 'detail_') + '.png'),
      }
    } 
    
    story.push({
      page: index,
      image: thumbnailData,
      text: mainText,
      touchable: touchable,
      iconList: iconList,
      detailImage: detailImage
    });
  }));
  story.sort((a, b) => a.page - b.page);
  await saveAsyncData(ASYNC_KEY_PREFIX + id, story);
};
