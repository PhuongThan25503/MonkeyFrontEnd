import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, Image, StatusBar } from "react-native";

import { Image as SKImage, useImage } from '@shopify/react-native-skia';
import { SafeAreaView } from 'react-native-safe-area-context';

import PageTextLayer from '../PageTextLayer';
import CanvasLayer from '../CanvasLayer';
import { ASYNC_KEY_PREFIX, MAINCOLOR, SCALE } from '../../../config';
import SyncTextLayer from '../SyncTextLayer';
import { getAsyncData } from '../../../utils/asyncStorage';

import LoadingScene from '../../LoadingScene';
import { useIsDownloaded } from '../../LoadingScene/store';
import { getIconStory } from '../../../data/dataPreparation/iconStory';
import { StoryData } from '../types';
import LastPage from '../../LastPage';
import { anim } from '../../../utils/animation';
import { wordStyle } from '../style/PageTextStyle';
import BackButton from '../../../components/StoryHeader/BackButton';

function IconStory({ route, navigation }: any) {

  //device dimension
  const deviceOrientations = { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height };
  //all page of story
  const [currentPageNum, setCurrentPageNum] = useState(0);

  //current main text that appear on the screen (if that screen has many texts)
  const [currentMainText, setCurrentMainText] = useState(0);

  const [storyData, setStoryData] = useState<StoryData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const isLoaded = useIsDownloaded((state: any) => state.isDownloaded);

  const setIsLoaded = useIsDownloaded((state: any) => state.setIsDownloaded)

  const opacityValue = useRef(new Animated.Value(0)).current;

  // /** : initialize page **/
  useEffect(() => {
    setIsLoading(true);
    getIconStory(route.params.id).then(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoaded(false);
    };
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const fetchData = async () => {
        const data = await getAsyncData(ASYNC_KEY_PREFIX + route.params.id);
        setStoryData(JSON.parse(data).mainData); 
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
      setCurrentPageNum((prew) => {
        if (prew - 1 >= 0) {
          return (prew - 1)
        } else return (prew)
      });
    }
  }

  useEffect(() => {
    opacityValue.setValue(1);
    anim(opacityValue, 0, 1000);
  }, [currentPageNum])
  const setGlobalCurrentMainText = (a: number) => {
    setCurrentMainText(a);
  }

  const setCurrentPage = (num: number) => {
    setCurrentPageNum(num);
  }

  return (
    (storyData && <SafeAreaView style={{ width: deviceOrientations.width, height: deviceOrientations.height }}>
      <StatusBar hidden={true}></StatusBar>
      <Image resizeMode={'contain'} style={wordStyle.image} source={{ uri: storyData[currentPageNum]?.image }} />
      <SyncTextLayer
        mainText={storyData[currentPageNum]?.text}
        setGlobalCurrentMainText={setGlobalCurrentMainText}
      ></SyncTextLayer>

      <PageTextLayer
        deviceWidth={deviceOrientations.width}
        mainText={storyData[currentPageNum]?.text}
        currentMainText={currentMainText}
        iconData={storyData[currentPageNum]?.iconList}>
      </PageTextLayer>
      
      <CanvasLayer
        deviceWidth={deviceOrientations.width}
        setPageNum={setPageNum}
        deviceHeight={deviceOrientations.height}
        mainText={storyData[currentPageNum]?.text[currentMainText]?.text}
        pageTouches={storyData[currentPageNum]?.touchable}>
        {/* <SKImage x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(storyData[currentPageNum]?.image)} /> */}

        <SKImage
          x={storyData[currentPageNum]?.detailImage?.position[0] * SCALE}
          y={storyData[currentPageNum]?.detailImage?.position[1] * SCALE} fit={'fitHeight'}
          width={storyData[currentPageNum]?.detailImage?.size[0] * SCALE}
          height={storyData[currentPageNum]?.detailImage?.size[1] * SCALE}
          image={useImage(storyData[currentPageNum]?.detailImage?.image)} />

      </CanvasLayer>

      {(!isLoaded || isLoading) ? <LoadingScene isLoading={isLoading} ></LoadingScene> : <></>}
      {
        (currentPageNum >= storyData.length && storyData.length > 0) ? <LastPage setCurrentPageNum={setCurrentPage}></LastPage> : <BackButton navigation={navigation} color={MAINCOLOR}></BackButton>
      }
    </SafeAreaView>)
  );
}

export default IconStory;
