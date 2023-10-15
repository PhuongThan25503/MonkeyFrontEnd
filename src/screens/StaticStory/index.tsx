import React, { useEffect, useState } from 'react'
import { Dimensions, StatusBar } from "react-native";

import { Image, useImage } from '@shopify/react-native-skia';
import { SafeAreaView } from 'react-native-safe-area-context';

import PageTextLayer from './PageTextLayer';
import CanvasLayer from './CanvasLayer';
import { ASYNC_KEY_PREFIX, SCALE } from '../../config';
import SyncTextLayer from './SyncTextLayer';
import { getAsyncData } from '../../utils/asyncStorage';
import { getStaticStory } from '../../data/dataPreparation/staticStory';
import LoadingScene from '../LoadingScene';
import { useIsDownloaded } from '../LoadingScene/store';

function StaticStory({ route }: any) {
  
  //device dimension
  const deviceOrientations = { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height };
  //all page of story
  const [currentPageNum, setCurrentPageNum] = useState(0);

  //current main text that appear on the screen (if that screen has many texts)
  const [currentMainText, setCurrentMainText] = useState(0);

  const [storyData, setStoryData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const isLoaded = useIsDownloaded((state :any)=> state.isDownloaded);
  const setIsLoaded = useIsDownloaded((state :any) => state.setIsDownloaded);

  // /** : initialize page **/
  useEffect(() => {
    setIsLoading(true);
    getStaticStory(route.params.id).then(() => {
      setIsLoading(false);
    })
    return () => {
      setIsLoaded(false);
    };
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const fetchData = async () => {
        const data = await getAsyncData(ASYNC_KEY_PREFIX + route.params.id);
        setStoryData(JSON.parse(data));
      };
      fetchData();
    }
  }, [isLoaded])

  const setPageNum = (status: number) => {
    if (status == 1) {
      setCurrentMainText(0);
      setCurrentPageNum((prew) => prew + 1);
    }
    if (status == -1) {
      setCurrentMainText(0);
      setCurrentPageNum((prew) => prew - 1);
    }
  }

  const setGlobalCurrentMainText = (a: number) => {
    setCurrentMainText(a);
  }

  return ( 
    (storyData && <SafeAreaView style={{ width: deviceOrientations.width, height: deviceOrientations.height }}>
      <StatusBar hidden={true}></StatusBar>
      <PageTextLayer
        deviceWidth={deviceOrientations.width}
        mainText={storyData[currentPageNum]?.text}
        currentMainText={currentMainText}>
      </PageTextLayer>

      <SyncTextLayer
        mainText={storyData[currentPageNum]?.text}
        setGlobalCurrentMainText={setGlobalCurrentMainText}
      ></SyncTextLayer>

      <CanvasLayer
        deviceWidth={deviceOrientations.width}
        setPageNum={setPageNum}
        deviceHeight={deviceOrientations.height}
        mainText={storyData[currentPageNum]?.text[currentMainText]?.text}
        pageTouches={storyData[currentPageNum]?.touchable}
        scale={SCALE}>
        <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(storyData[currentPageNum]?.image)} />
      </CanvasLayer>
      {(!isLoaded || isLoading) ? <LoadingScene isLoading={isLoading} ></LoadingScene> : <></>}
    </SafeAreaView>)
  );
}

export default StaticStory;
