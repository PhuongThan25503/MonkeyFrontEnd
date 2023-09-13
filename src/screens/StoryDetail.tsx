import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Platform, StatusBar, Text, View } from "react-native";

import { Canvas, Fill, Image, Path, useFont, useImage } from '@shopify/react-native-skia';
import { getPagesByStoryId } from '../utils/story';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import SoundPlayer from 'react-native-sound-player';
import { SafeAreaView } from 'react-native-safe-area-context';
// interface RouteParams {
//   id: number;
// }

// interface Route {
//   params: RouteParams;
//   route: RouteProp<RootStackParamList>
// }
type touchableData = {
  path: string,
  data: number[]
}
type touchableMediaData = {
  text: string,
  audio: string
}
type mainText = {
  text: string[],
  audio: string,
}
/**
 * Config for canvas path
 */
const COLOR = "red";
const OPACITY = 0.5;
const SCALE = 0.55;
const xFix = 15;
/**
 * 
 */

function StoryDetail({ route }: any) {
  const [pages, setPages] = useState<any[]>([]); //all page of story
  const [currentPage, setCurrentPage] = useState<any>(); //id of page
  const [currentPageNum, setCurrentPageNum] = useState(0); //order of page 

  //device dimension
  const [deviceOrientations, setDeviceOrientations] = useState({ width: Dimensions.get('screen').height, height: Dimensions.get('screen').width });

  //update the divice orientation dimension
  const updateDeviceOrientation = () => {
    setDeviceOrientations(Dimensions.get('screen'));
  }

  //main text for a page
  const [mainText, setMainText] = useState<mainText>({ audio: '', text: [''] });

  //initialize basic info of the page
  const initializePage = async () => {
    getPagesByStoryId(route.params.id)
      .then(data => {
        setPages(data);
        let currentPage = data?.page[currentPageNum];
        setCurrentPage(currentPage);
        setMainText({ text: currentPage.text?.text.split(' '), audio: currentPage.text?.audio?.audio });
      })
  };

  const [verticlesArray, setVerticlesArray] = useState<any[]>([]);
  //data of each touchable
  const [touchableData, setTouchableData] = useState<any[]>([]);

  // render touchable into an array
  const stringArrayToPolygonArray = () => {
    let tempArray: touchableData[] = [];
    let tempTouchData: touchableMediaData[] = [];
    currentPage && currentPage.touch_.length > 0 && currentPage?.touch_?.map((t: any, i: number) => {

      //get the media data
      tempTouchData.push({ text: t?.text.text, audio: t?.text.audio?.audio })

      //get the data of verticle for drwing path
      tempArray.push(verticlesToPath(t?.data, deviceOrientations.height));

    })
    setVerticlesArray(tempArray); //save state
    setTouchableData(tempTouchData); //save state
  }

  //when page change
  useEffect(() => {
    stringArrayToPolygonArray();
    if (mainText?.audio && mainText.audio.length > 0) {
      try {
        SoundPlayer.playUrl(mainText?.audio);
      }catch(error){
        console.log(error);
      }
    }
  }, [currentPage])

  //initialize story setting
  useEffect(() => {
    StatusBar.setHidden(true); // hidden the status bar
    updateDeviceOrientation();
    //Orientation.lockToLandscape(); // change the view into landscape
    Orientation.addLockListener(updateDeviceOrientation); // add event listener when update the orientation after rotating the screen
    initializePage();

    return () => {
      //Orientation.unlockAllOrientations(); //unlock so that when jupm to previous (other screen), the screen will be unlocked
      Orientation.removeDeviceOrientationListener(updateDeviceOrientation);
    };
  }, []);

  /**
   * tapping processing here
   */
  const gesture = Gesture.Tap().onStart((e) => {
    let pointInPolygon = require('point-in-polygon');
    verticlesArray.map((v, i) => {
      //if user touch to a touchable area
      if (pointInPolygon([e.absoluteX / SCALE, e.absoluteY / SCALE], v.data)) {
        let currentEffect = touchableData[i];
        SoundPlayer.playUrl(currentEffect.audio); //play sound 
        console.log(mainText.audio);
        //console.log(touchableData[i]);
      }
    })
  })

  return (
    <SafeAreaView>
      <View style={{ position: 'absolute', width: deviceOrientations.width, zIndex: 10, alignItems: 'center' }}>
        <View style={{flexDirection: 'row' }}>
          {
            mainText.text.map(mt =>
              <Text style={{ color: 'black', fontSize: 25 , marginTop: 35}}>{mt} </Text>
            )
          }
        </View>
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={gesture}>
          <Canvas style={{ height: deviceOrientations.height, width: deviceOrientations.width }}>
            <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(currentPage?.background)}>
            </Image>
            {
              verticlesArray.map((v: touchableData, i: number): any => (
                <Path
                  key={i}
                  opacity={OPACITY}
                  transform={[{ scale: SCALE }]}
                  path={v.path}
                  color={COLOR}
                />
              ))
            }
            {/* <Text text={mainText.text} font={useFont(require('../assets/The-fragile-wind.ttf'), deviceOrientations.height * 0.08)} y={50} x={deviceOrientations.width * 0.3} /> */}
          </Canvas>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

/**
 * convert raw data to path string that can be used
 */

//change raw data to number array and string path
const verticlesToPath = (data: string[], height: number): touchableData => {
  height = Math.round(height / SCALE);
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

export default StoryDetail;
