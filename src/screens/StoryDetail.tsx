import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Image as RNImage, ScrollView, Dimensions, Pressable } from "react-native";

import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import { SafeAreaView } from "react-native-safe-area-context";
import { StoryDetailStyle } from './styles/StoryDetailStyle';
import { RouteProp } from '@react-navigation/native';
import { PageInterface, RootStackParamList } from '../types';
import { defaultPage, getPagesByStoryId } from '../utils/story';

interface RouteParams {
  id: number;
}

interface Route {
  params: RouteParams;
  route: RouteProp<RootStackParamList>
}

function StoryDetail({ route }: { route: Route }) {
  const [pages, setPages] = useState<PageInterface[]>([defaultPage]);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const { width, height } = Dimensions.get('window');

  const handleImageCanvas = async (canvas: Canvas) => {

    //check if canvas a instanceof Canvas so that will not return error
    if (!(canvas instanceof Canvas)) {
      return;
    }

    const image = new CanvasImage(canvas);
    const imageUri = currentPage.background;
    canvas.width = height;
    canvas.height = width;
    image.src = imageUri;
    const ctx = canvas.getContext('2d');

    //load the canvas once the image is finish loaded
    image.addEventListener('load', () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
  }

  const handleTextCanvas = async (canvas: Canvas) => {

    //check if canvas a instanceof Canvas so that will not return error
    if (!(canvas instanceof Canvas)) {
      return;
    }
    const boxHeight = 50;
    const boxWidth = 100;
    // const X = canvas.width - boxWidth/2;
    // const Y = canvas.height - boxHeight /2;
    const X = 0;
    const Y = 0;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(Y, X, boxWidth, boxHeight);
  }

  const initializePage = () => {
    return new Promise((resolve, reject) => {
      getPagesByStoryId(route.params.id)
        .then(data => {
          setPages(data);
          setMaxPage(data.length);
          setCurrentPage(data[currentPageNum]);
          resolve(data);
        })
        .catch(error => reject(error));
    });
  };

  useEffect(() => {
    initializePage();
  }, []);

  return (
    <SafeAreaView style={StoryDetailStyle.screen}>
      <View style={StoryDetailStyle.screenBound}>
        <Canvas style={StoryDetailStyle.screenBox} ref={handleImageCanvas}></Canvas>
        <Pressable onPress={() => console.log('press')} style={StoryDetailStyle.touchable}>
          <Canvas style={{width: 100, height: 50}} ref={handleTextCanvas}></Canvas>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default StoryDetail;