import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Platform, StatusBar, Text as RNText, View } from "react-native";

import { Canvas, Fill, Image, Path, useFont, useImage, Text as SKText, Group, rotate, vec } from '@shopify/react-native-skia';
import { getPagesByStoryId } from '../utils/story';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

/**
 * type define here
 */

type touchableData = {
  path: string,
  data: number[]
}

type textConfig = {
  x: number,
  y: number,
  rotate: number,
}

type touchableMediaData = {
  text: string,
  audio: string
  config: textConfig,
}

type mainText = {
  text: string[],
  audio: string,
  syncData: any[],
  duration: number,
}

/**
 * constant difine here
 */

const COLOR = "red";
const OPACITY = 0.5;
const SCALE = 0.55;
const xFix = 14;
const DELAY_FIX = 0;
const DEGREE = Math.PI / 180;

/**
 * main function
 */

function StoryDetail({ route }: any) {

  /**
 * state defining below here
 */

  //const image = useImage('https://res.cloudinary.com/dck2nnfja/image/upload/v1693969149/MonkeyApp/Story/1/1.png');

  //device dimension
  const deviceOrientations = { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height };

  //all page of story
  const [pages, setPages] = useState<any[]>([]);

  //order of page 
  const [currentPageNum, setCurrentPageNum] = useState(-1);

  //array of boolean that difine at which word the highlight effect affected
  const [wordEffect, setWordEffect] = useState<boolean[]>([]);

  // array that contain polygon of touchable [x, y]...
  const [verticlesArray, setVerticlesArray] = useState<touchableData[]>([]);

  //data of each touchable : text ,sound, config ....
  const [touchableData, setTouchableData] = useState<touchableMediaData[]>([]);

  //image background of the page 
  const [pageBackground, setPageBackground] = useState<string>();

  //main text for a page
  const [mainText, setMainText] = useState<mainText[]>([]);

  //current main text that appear on the screen (if that screen has many texts)
  const [currentMainText, setCurrentMainText] = useState(0);

  //ready to play sound ?
  const [isReadyToPlaySound, setIsReadyToPlaySound] = useState<boolean>(false);

  //floating text that appear when use press on screen's item
  const [popUpText, setPopUpText] = useState<touchableMediaData>({
    audio: '',
    text: '',
    config: { x: 0, y: 0, rotate: 0 }
  });

  //refreshing state
  const [refreshing, setRefreshing] = useState(false);

  /**
   * useEffect state sequence
   */

  /** : initialize page **/
  useEffect(() => {
    initializePage();
    setCurrentPageNum(0);
  }, [])

  /** # : after go to new page / go to story the first time , initialize neccessary data **/
  useEffect(() => {
    if (!pages) {
      return;
    }
    if (!pages[currentPageNum]) {
      return;
    }
    //set the background
    setPageBackground(pages[currentPageNum].background);
    //set the point of array
    stringArrayToPolygonArray();
    let currentPageText = pages[currentPageNum].text_config;
    //set data for main text
    let tempTextData: mainText[] = [];
    currentPageText.map((c: { audio: { audio: any; duration: any; sync_data: string; }; text: { text: string; }; }) => {
      tempTextData.push({
        audio: c.audio.audio,
        text: c.text.text.split(' '),
        duration: c.audio.duration,
        syncData: JSON.parse(c.audio.sync_data),
      })
    });
    setMainText(tempTextData);
    setCurrentMainText(0); //set possition of the text to 0
    console.log("change page num deteacted");
  }, [currentPageNum, pages])

  /** after preparing main text ,set the current main text **/
  useEffect(() => {
    console.log("change current main text detected");
    console.log(mainText[currentMainText]);
    setWordEffect(mainText[currentMainText]?.syncData.map(e => false));
    setIsReadyToPlaySound(true);
    console.log("change main text detected");
  }, [mainText])

  /** if current main text has change, play the sound **/
  useEffect(() => {
    setIsReadyToPlaySound(true);
  },[currentMainText])

  /** play the sound **/ 
  useEffect(()=> {
    console.log("play sound");
    if(isReadyToPlaySound){
      playMainAudio();
      setIsReadyToPlaySound(false);
    }
  },[isReadyToPlaySound])

  /** if want to here audio again, then play again **/
  useEffect(() => {
    console.log("change play");
    playMainAudio();
  }, [refreshing])

  /**
   * functions used
   */

  //initialize basic info of the page
  const initializePage = async () => {
    await getPagesByStoryId(route.params.id)
      .then(data => {
        setPages(data.page);
      })
  };

  //play effect text when sound start :
  const playEffectText = (mainText: mainText) => {
    if (!pages) {
      return null;
    }
    let startTime = performance.now() + DELAY_FIX;
    let timer = setInterval(updateTimer.bind(null, startTime), 10);
    let wordIndex = 0;
    let syncData = mainText.syncData;
    function updateTimer(startTime: number) {

      // Get the current time
      let currentTime = performance.now();
      // Calculate the elapsed time
      let elapsedTime = Math.floor(currentTime - startTime);

      if (syncData[wordIndex].s <= elapsedTime) {
        // console.log(syncData[wordIndex].w);
        // console.log(wordEffect);
        setWordEffect(wordEffect.map((w, index) => (index == wordIndex) ? true : false))
        if (wordIndex >= syncData.length - 1) { //when reach another word, switch
          if (elapsedTime >= mainText.duration) {
            // Stop the timer
            setWordEffect(mainText.syncData.map(s => false));
            clearInterval(timer);
          }
          return;
        }
        wordIndex++;
      }
    }
  }

  /** play the main audio of the page **/
  const playMainAudio = () => {
    if (!pages) {
      return null;
    }
    try {
      SoundPlayer.playUrl(mainText[currentMainText].audio);

      //when finish loading, play audio
      let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
        console.log("start");
        playEffectText(mainText[currentMainText]);
      });

      //when finish playing audio , remove listener to avoid error
      let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
        console.log("finished");
        _onLoadingSubscription.remove(); //remove event listener 
        _onFinishSubscription.remove(); //remove event listener 

        if(currentMainText< mainText.length -1){
          setCurrentMainText(currentMainText +1);
          console.log("up current text pos to :" + (currentMainText + 1));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /** render touchable into an array **/
  const stringArrayToPolygonArray = () => {
    if (!pages) {
      return null;
    }
    let tempArray: touchableData[] = [];
    let tempTouchData: touchableMediaData[] = [];
    let currentPage = pages[currentPageNum];
    currentPage && currentPage.touch_.length > 0 && currentPage.touch_.map((t: any, i: number) => {

      //get the media data
      tempTouchData.push({ text: t.text.text, audio: t.text.audio.audio, config: t.config })

      //get the data of verticle for drwing path
      tempArray.push(verticlesToPath(t.data, deviceOrientations.height));

    })
    setVerticlesArray(tempArray); //save state
    setTouchableData(tempTouchData); //save state
  }

  /** change page handler **/
  const pageChangeHandler = (isNext: boolean) => {
    if (!pages) {
      return null;
    }
    //can not go back in the first page
    if (currentPageNum == 0 && !isNext) {
      return;
    }

    //can not go next when reach the last page
    if (currentPageNum == pages?.length - 1 && isNext) {
      return;
    }
    if (isNext) {
      setCurrentPageNum(currentPageNum + 1);
    }
    else {
      setCurrentPageNum(currentPageNum - 1);
    }
  }

  /** refresh handler **/
  const onRefresh = () => {
    if (!pages) {
      initializePage();
      return null;
    }
    setRefreshing(!refreshing);
  };

  /** change raw data to number array and string path **/
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

  /** tapping processing here **/
  const onTap = Gesture.Tap()
    .onStart((e) => {
      let pointInPolygon = require('point-in-polygon');
      verticlesArray.map((v, i) => {
        //if user touch to a touchable area
        if (pointInPolygon([e.absoluteX / SCALE, e.absoluteY / SCALE], v.data)) {
          let currentEffect = touchableData[i];
          try {
            SoundPlayer.playUrl(currentEffect.audio); //play sound 
            let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
              setPopUpText(touchableData[i]);
            });
            let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
              setPopUpText({ audio: '', text: '', config: { x: 0, y: 0, rotate: 0 } });
              _onLoadingSubscription.remove();
              _onFinishSubscription.remove();
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
    })
    .onEnd(() => {
      console.log(isReadyToPlaySound);
    })

  return (
    <SafeAreaView>
      <View style={{ position: 'absolute', flex: 1, width: deviceOrientations.width, zIndex: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Button title='pre' onPress={() => pageChangeHandler(false)}></Button>
        <Button title='refresh' onPress={() => onRefresh()}></Button>
        <Button title='post' onPress={() => pageChangeHandler(true)}></Button>
      </View>

      <View style={{ position: 'absolute', width: deviceOrientations.width, zIndex: 2, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          {
            wordEffect && mainText[currentMainText]?.text.map((mt, index) => (
              wordEffect[index] ? <RNText key={index} style={wordStyle.highlighted}>{mt} </RNText> : <RNText key={index} style={wordStyle.default}>{mt} </RNText>
            )
            )
          }
        </View>
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={onTap}>
          <Canvas style={{ height: deviceOrientations.height, width: deviceOrientations.width }}>
            <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(pageBackground)}>
            </Image>
            {/* path below is for visible debugging, delete whenever you like */}
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
            <SKText text={popUpText?.text} origin={vec(popUpText.config.x * SCALE, popUpText.config.y * SCALE)} font={useFont(require('../assets/The-fragile-wind.ttf'), deviceOrientations.height * 0.08)} x={popUpText.config.x * SCALE} y={popUpText.config.y * SCALE} transform={[{ rotate: popUpText.config.rotate * DEGREE }]} />
          </Canvas>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

/**
 * Style
 */

const wordStyle = StyleSheet.create({
  default: {
    color: 'black',
    fontSize: 25,
    marginTop: 35
  },
  highlighted: {
    color: 'red',
    fontSize: 25,
    marginTop: 35
  }
});

export default StoryDetail;
