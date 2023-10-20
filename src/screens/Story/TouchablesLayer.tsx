import React from 'react';
import { useEffect, useState } from 'react';

import { useFont, Text as SKText, vec, Paint, Rect, RoundedRect } from '@shopify/react-native-skia';
import { Gesture } from "react-native-gesture-handler";
import SoundPlayer from "react-native-sound-player";

import { touchableMediaData } from '../../types';
import { normalizeText } from '../../utils/story';
import { DEGREE, SCALE } from '../../config';
import { useAnimatedHighlight, useTextEffect } from './globalStates/index';

type Props = {
  mainText: string[],
  gestureHandler: any,
  deviceHeight: number,
  pageTouches: any,
}

export default function TouchablesLayer({ mainText, pageTouches, gestureHandler, deviceHeight }: Props) {
  //floating text that appear when use press on screen's item
  const [popUpText, setPopUpText] = useState<touchableMediaData>({
    audio: '',
    text: '',
    config: { x: 0, y: 0, rotate: 0, width: 0 }
  });

  const pointInPolygon = require('point-in-polygon');

  const [target, setTarget] = useState<[a: number, b: number]>();
  const setTextEffect = useTextEffect((state: any) => state.setEffectIndex);

  const setAnimatedOn = useAnimatedHighlight((state: any) => state.setAnimatedOn);

  /** tapping processing here **/
  const onTap = Gesture.Tap()
    .onStart((e) => {
      setTarget([e.absoluteX / SCALE, e.absoluteY / SCALE]);
    })

  useEffect(() => { //reset pop up text when move page
    setPopUpText({ audio: '', text: '', config: { x: 0, y: 0, rotate: 0, width: 0 } });
  }, [mainText])

  useEffect(() => {
    pageTouches?.map((v: any, i: number) => {
      //if user touch to a touchable area
      if (v.verticles?.length > 0 ? pointInPolygon(target, v.verticles) : false) {
        let currentEffect = pageTouches[i];
        setPopUpText(currentEffect);// set pop up text
        try {
          SoundPlayer.playUrl(currentEffect.audio); //play sound 
          let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
            mainText.map((mt: string, k: number) => {
              //highlight the word if the word chosen match the word in top-text
              if (normalizeText(mt) == normalizeText(currentEffect.text)) {
                setTextEffect(k);
                setAnimatedOn(true); //trigger the animation
              }
            })
          });
          let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
            setPopUpText({ audio: '', text: '', config: { x: 0, y: 0, rotate: 0, width: 0 } }); //reset state
            setTextEffect(-1);
            setAnimatedOn(false); //trigger the animation
            _onLoadingSubscription.remove();
            _onFinishSubscription.remove();
          });
        } catch (error) {
          console.log(error);
        }
      }
    })
  }, [target])

  useEffect(() => {
    gestureHandler(onTap); //export gesture
  }, [])
  return (
    <React.Fragment>
      <RoundedRect
        opacity={0.8}
        r={5}
        origin={vec(popUpText.config.x * SCALE, popUpText.config.y * SCALE)}
        transform={[{ rotate: popUpText.config.rotate * DEGREE }]}
        x={popUpText.config.x * SCALE}
        y={popUpText.config.y * SCALE - deviceHeight * 0.05}
        // width={popUpText?.text.length * 15}
        width={popUpText.config.width * SCALE}
        height={deviceHeight * 0.05 + 10}
        color="gray" />
      <SKText
        color={'white'}
        text={" " + popUpText?.text}
        origin={vec(popUpText.config.x * SCALE, popUpText.config.y * SCALE)}
        font={useFont(require('../../assets/The-fragile-wind.ttf'), deviceHeight * 0.05)}
        x={popUpText.config.x * SCALE}
        y={popUpText.config.y * SCALE}
        transform={[{ rotate: popUpText.config.rotate * DEGREE }]} >
      </SKText>
    </React.Fragment>
  )
}