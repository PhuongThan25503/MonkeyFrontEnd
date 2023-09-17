import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Platform, StatusBar, Text as RNText, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Canvas, Fill, Image, Path, useFont, useImage, Text as SKText, Group, rotate, vec, LinearGradient, SweepGradient, translate } from '@shopify/react-native-skia';
import { getPagesByStoryId } from '../utils/story';
import { Gesture, GestureDetector, GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
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
const xFix = 15;
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

  //alowwed to go to the next page ?
  const [lockPage, setLockPage] = useState(false);

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
    setWordEffect(mainText[currentMainText]?.syncData.map(e => false));
    setIsReadyToPlaySound(true);
    console.log("change main text detected");
  }, [mainText])

  /** if current main text has change, play the sound **/
  useEffect(() => {
    setWordEffect(mainText[currentMainText]?.syncData.map(e => false));
    setIsReadyToPlaySound(true);
  }, [currentMainText])

  /** play the sound **/
  useEffect(() => {
    console.log("play sound");
    if (isReadyToPlaySound) {
      playMainAudio();
      setIsReadyToPlaySound(false);
    }
  }, [isReadyToPlaySound])

  /** if want to here audio again, then play again **/
  useEffect(() => {
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

  /**  play effect text when sound start **/
  const playEffectText = (mainText: mainText) => {
    setLockPage(true);
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
        setWordEffect(wordEffect?.map((w, index) => (index == wordIndex) ? true : false))
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
        _onLoadingSubscription.remove();
        playEffectText(mainText[currentMainText]);
      });

      //when finish playing audio , remove listener to avoid error
      let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
        console.log("finished");
        _onLoadingSubscription.remove(); //remove event listener 
        _onFinishSubscription.remove(); //remove event listener 

        if (currentMainText < mainText.length - 1) {
          setCurrentMainText(currentMainText + 1);
          console.log("up current text pos to :" + (currentMainText + 1));
        } else {
          setLockPage(false);
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

    //can not go next when reach the last page
    if (currentPageNum < (pages?.length - 1) && isNext && !lockPage) {
      setCurrentPageNum(currentPageNum + 1);
    }

    //cannot go back in first page
    if (currentPageNum != 0 && !isNext && !lockPage) {
      setCurrentPageNum(currentPageNum - 1);
    }
  }

  /** refresh handler **/
  const onRefresh = () => {
    if (!pages) {
      //initializePage();
      return null;
    }
    if(!lockPage) {
      setCurrentMainText(0) ;// set main text to the first sentence
      setRefreshing(!refreshing); // while playing audio, no action permited
    }
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

  /**
   * gesture handler
   */
  const [gestureFlag, setGestureFlag] = useState(0); //flag for gesture decide if trigger animation or not
  const [nextPageFlag, setNextPageFlag] = useState(false); // flag for going to next page or not
  const [postPageFlag, setPostPageFlag] = useState(false); // flag for going to previous page or not
  const [opacityEffect, setOpacityEffect] = useState(1); // if intent to changepapge, set the opacity effect

  const gestureAnim = (dir: number, absX: number, absY: number) => {
    if (dir == 1) {//next
      //if user intend to go to the next page, trigger the animation 
      if (gestureFlag && absX >= deviceOrientations.width / 1.6) {
        setAnimPath('M ' + absX + ' ' + absY + ' L ' + (absX + (deviceOrientations.width - absX) / 3) + ' ' + deviceOrientations.height + ' L ' + (deviceOrientations.width - ((deviceOrientations.width - absX + absY / 4) / 7)) + ' 0' + ' Z');
      }
      //if user want , then change page
      if (gestureFlag && absX < deviceOrientations.width / 1.6) {
        setNextPageFlag(true);
        setOpacityEffect(0.5);
      } else {
        setNextPageFlag(false);
        setOpacityEffect(1);
      }
    }
    if (dir == -1) {
      //if user intend to go to the next page, trigger the animation 
      if (gestureFlag && absX <= deviceOrientations.width / 3) {
        setAnimPath('M ' + absX + ' ' + absY + ' L ' + (absX * 0.5) + ' ' + deviceOrientations.height + ' L ' + (absX * 0.3) + ' 0' + ' Z');
      }
      //if user want , then change page
      if (gestureFlag && absX > deviceOrientations.width / 3) {
        setPostPageFlag(true);
        setOpacityEffect(0.5);
      } else {
        setPostPageFlag(false);
        setOpacityEffect(1);
      }
    }
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
      console.log(pages.length);
    })

  const [animPath, setAnimPath] = useState('');
  /**Drag gesture handler **/
  const onDrag = Gesture.Pan()
    .onStart((e) => {
      console.log('panning...');
      if (e.absoluteX > deviceOrientations.width - deviceOrientations.width / 3) setGestureFlag(1); // if gesture is swipe from left to right , it means co to previous page
      if (e.absoluteX < deviceOrientations.width / 3) setGestureFlag(-1); // if gesture is swipe from right to left, it means go to right page
    })
    .onUpdate((e) => {
      if (gestureFlag != 0) { // if use intend to change page , trigger the aim
        gestureAnim(gestureFlag, e.absoluteX, e.absoluteY)
      }
    })
    .onEnd((e) => {
      if (nextPageFlag) {
        pageChangeHandler(true);
      }
      if (postPageFlag) {
        pageChangeHandler(false);
      }
      setNextPageFlag(false);
      setPostPageFlag(false);
      setGestureFlag(0);
      setOpacityEffect(1);
      setAnimPath('');
    })
  return (
    <SafeAreaView style={{ opacity: opacityEffect }}>
      <StatusBar hidden={true}></StatusBar>

      <View style={{ position: 'absolute', flex: 1, width: deviceOrientations.width, zIndex: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onRefresh()} style={wordStyle.icon}>
          <Ionicons name='reload' color={'black'} size={25}></Ionicons>
        </TouchableOpacity>
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
        <GestureDetector gesture={Gesture.Race(onDrag, onTap)}>
          <Canvas style={{ height: deviceOrientations.height, width: deviceOrientations.width }}>
            <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(pageBackground)}>
            </Image>
            {/* path below is for visible debugging, delete whenever you like */}
            {/* {
              verticlesArray.map((v: touchableData, i: number): any => (
                <Path
                  key={i}
                  opacity={OPACITY}
                  transform={[{ scale: SCALE }]}
                  path={v.path}
                  color={COLOR}
                />
              ))
            } */}
            <Path
              //transform={[{ scale: SCALE }]}
              path={animPath}
              color={COLOR}
            >
              <SweepGradient
                c={vec(128, 128)}
                colors={["cyan", "magenta", "yellow", "cyan"]}
              />
            </Path>
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
  },
  icon: {
    backgroundColor: 'aqua',
    padding: 15,
    borderRadius: 20
  }
});

export default StoryDetail;
