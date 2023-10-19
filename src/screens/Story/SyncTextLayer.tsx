import React, { useEffect, useRef, useState } from "react";
import { mainText } from '../../types';
import SoundPlayer from "react-native-sound-player";
import { useTextEffect, useTouchable } from "./globalStates/index";

export default function SyncTextLayer({ mainText, setGlobalCurrentMainText }: any) {
  //ready to play sound ?
  const [isReadyToPlaySound, setIsReadyToPlaySound] = useState<boolean>(false);

  //current main text that appear on the screen (if that screen has many texts)
  const [currentMainText, setCurrentMainText] = useState(0);

  const setTextEffect = useTextEffect((state: any) => state.setEffectIndex);

  const setIsTouchable = useTouchable((state: any) => state.setTouchable);


  const timerId = useRef<any>();

  const _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
    _onLoadingSubscription.remove();
    try {
      if (mainText && mainText?.length > 0) {
        playEffectText(mainText[currentMainText]);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
    try {
      if (currentMainText < mainText?.length - 1) {
        setCurrentMainText(currentMainText + 1);
        _onLoadingSubscription.remove();
        _onFinishSubscription.remove();
      }
    } catch (error) {
      console.log(error);
    }
  });

  /** after preparing main text ,set the current main text **/
  useEffect(() => {
    if (!mainText && mainText?.length == 0) {
      return;
    }
    setTextEffect(-1);
    setIsReadyToPlaySound(true);
    setCurrentMainText(0);
    return() => {clearInterval(timerId.current)}
  }, [mainText])

  /** if current main text has change, play the sound **/
  useEffect(() => {
    setTextEffect(-1);
    if (currentMainText < mainText?.length) {
      setIsReadyToPlaySound(true);
    }
  }, [currentMainText])

  /** play the sound **/
  useEffect(() => {
    if (isReadyToPlaySound) {
      setGlobalCurrentMainText(currentMainText);
      playMainAudio();
      setIsReadyToPlaySound(false);
      setIsTouchable(false);
    }
  }, [isReadyToPlaySound])

  /**  play effect text when sound start **/
  const playEffectText = (mainText: mainText) => {
    let startTime = performance.now();
    let timer = setInterval(updateTimer.bind(null, startTime), 10);
    clearInterval(timerId.current);
    timerId.current = timer;
    let wordIndex = 0;
    let syncData = mainText.syncData;
    let switchEffectFlag = true; // flag to reduce the render times
    function updateTimer(startTime: number) {
      // Get the current time
      let currentTime = performance.now();
      // Calculate the elapsed time
      let elapsedTime = Math.floor(currentTime - startTime);
      if (elapsedTime >= mainText.duration) { // when reach the end, remove timer
        setTextEffect(-1);
        clearInterval(timer);
      }
      if (syncData[wordIndex]?.s <= elapsedTime && switchEffectFlag) {
        switchEffectFlag = false;
        setTextEffect(wordIndex);
        if (wordIndex < syncData.length) { // if not yet reach limit , go to next
          wordIndex++;
        }
      } else {
        if (wordIndex == syncData.length){ // if reach limit ,stop 
          switchEffectFlag = false;
          setIsTouchable(true);
        }
        else {
          switchEffectFlag = true; // if not , go to the next
        }
      }
    }
  }

  /** play the main audio of the page **/
  const playMainAudio = () => {
    try {
      SoundPlayer.playUrl(mainText[currentMainText].audio);
    } catch (error) {
      console.log(error);
    }
  }
  return (<></>)
}