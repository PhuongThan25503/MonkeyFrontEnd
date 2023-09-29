import React, { useEffect, useState } from 'react'
import { Dimensions, StatusBar } from "react-native";

import { Image, useImage } from '@shopify/react-native-skia';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPagesByStoryId } from '../../utils/story';
import { mainText } from '../../types';
import PageTextLayer from './PageTextLayer';
import CanvasLayer from './CanvasLayer';
import { SCALE } from '../../config';
import SyncTextLayer from './SyncTextLayer';

/**
 * main function
 */

function StoryDetail({ route }: any) {
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
      tempTextData.push({
        audio: c.audio.audio,
        text: c.text.text.split(' '),
        duration: c.audio.duration,
        syncData: JSON.parse(c.audio.sync_data),
      })
    });
    setMainText(tempTextData);
  }, [pages, currentPageNum])

  const setPageNum = (status: number) => {
    if (status == 1) {
      setCurrentPageNum((prew) => prew + 1);
    }
    if (status == -1) {
      setCurrentPageNum((prew) => prew - 1);
    }
  }
  const [GlobalWordEffect, setWordEffect] = useState<boolean[]>([]);
  const [GlobalAnimatedHighlight, setAnimTrigger] = useState(false);
  const setGlobalWordEffect = (a: boolean[]) => {
    setWordEffect(a);
  }

  const setGlobalAnimatedHighlight = (a: boolean) => {
    setAnimTrigger(a);
  }

  const setGlobalCurrentMainText = (a: number) => {
    setCurrentMainText(a);
  }
  SyncTextLayer({ mainText, setGlobalWordEffect, setGlobalCurrentMainText });
  return (
    <SafeAreaView style={{ width: deviceOrientations.width, height: deviceOrientations.height }}>
      <StatusBar hidden={true}></StatusBar>

      <PageTextLayer
        deviceWidth={deviceOrientations.width}
        mainText={mainText}
        currentMainText={currentMainText}
        wordEffectListener={GlobalWordEffect}
        animatedHighlight={GlobalAnimatedHighlight}>
      </PageTextLayer>

      <CanvasLayer
        deviceWidth={deviceOrientations.width}
        setPageNum={setPageNum}
        deviceHeight={deviceOrientations.height}
        syncData={mainText[0]?.syncData}
        setGlobalWordEffect={setGlobalWordEffect}
        setGlobalAnimatedHighlight={setGlobalAnimatedHighlight}
        pageTouches={pages[currentPageNum]?.touch_}
        scale={SCALE}>
        <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(pages[currentPageNum]?.background)}>
        </Image>
      </CanvasLayer>

    </SafeAreaView>
  );
}

export default StoryDetail;
