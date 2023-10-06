import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, StatusBar } from "react-native";

import { Image, useImage } from '@shopify/react-native-skia';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPagesByStoryId} from '../../utils/story';
import { asyncStoryData, mainText } from '../../types';
import PageTextLayer from './PageTextLayer';
import CanvasLayer from './CanvasLayer';
import { SCALE } from '../../config';
import SyncTextLayer from './SyncTextLayer';
import { useIsLoadingStore } from './globalStates/index';
import { getAsyncData } from '../../utils/asyncStorage';
import { IconData } from '../../data/iconData';
import { IconizeSyncData } from './utils';

function IconStory({ route }: any) {

  //device dimension
  const deviceOrientations = { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height };
  //all page of story
  const [pages, setPages] = useState<any[]>([]);
  //order of page 
  const [currentPageNum, setCurrentPageNum] = useState(0);
  //main text for a page
  const [mainText, setMainText] = useState<mainText[]>([]);
  //current main text that appear on the screen (if that screen has many texts)
  const [currentMainText, setCurrentMainText] = useState(0);

  const [asyncData, setAsyncData] = useState<asyncStoryData[]>([]);

  const isLoading = useIsLoadingStore((state: any) => state.isLoading);

  // /** : initialize page **/
  useEffect(() => {
    getPagesByStoryId(route.params.id)
      .then(data => {
        setPages(data.page);
      })
  }, [])

  /** after go to new page / go to story the first time , initialize neccessary data **/
  useEffect(() => {
    if (!pages) {
      return;
    }
    if (!pages[currentPageNum]) {
      return;
    }
    let currentPageText = pages[currentPageNum]?.text_config;
    //set data for main text
    let tempTextData: mainText[] = [];
    currentPageText?.map((c: { audio: { audio: any; duration: any; sync_data: string; }; text: { text: string; }; }) => {
      let syncData = JSON.parse(c.audio.sync_data);
      tempTextData.push({
        audio: c.audio.audio,
        text: syncData.map((s: any) => s.w),
        duration: c.audio.duration,
        syncData: syncData,
      })
    });

    //for icon story
    if (IconData && IconData[currentPageNum]) {
      let iconList = IconData[currentPageNum].map(i => i.word?.split(' ') || []);
      IconizeSyncData(tempTextData[0].syncData, iconList);
      tempTextData[0].text = tempTextData[0].syncData.map(s => s.w);
    }

    setMainText(tempTextData);
    getAsyncData('story').then(data => setAsyncData(JSON.parse(data)))
  }, [pages, currentPageNum])

  const setPageNum = (status: number) => {
    if (status == 1) {
      setCurrentPageNum((prew) => prew + 1);
    }
    if (status == -1) {
      setCurrentPageNum((prew) => prew - 1);
    }
  }

  const setGlobalCurrentMainText = (a: number) => {
    setCurrentMainText(a);
  }

  SyncTextLayer({ mainText, setGlobalCurrentMainText });

  return (
    <SafeAreaView style={{ width: deviceOrientations.width, height: deviceOrientations.height }}>
      <StatusBar hidden={true}></StatusBar>
      {isLoading && <ActivityIndicator />}
      <PageTextLayer
        deviceWidth={deviceOrientations.width}
        mainText={mainText}
        currentMainText={currentMainText}
        iconData={IconData[currentPageNum]}>
      </PageTextLayer>

      <CanvasLayer
        deviceWidth={deviceOrientations.width}
        setPageNum={setPageNum}
        deviceHeight={deviceOrientations.height}
        syncData={mainText[0]?.syncData}
        pageTouches={pages[currentPageNum]?.touch_}
        scale={SCALE}>
        {
          asyncData &&
          <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(asyncData[currentPageNum]?.image)} />
        }
      </CanvasLayer>
    </SafeAreaView>
  );
}

export default IconStory;
