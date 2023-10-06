import { useEffect, useState } from 'react';

import { Canvas, useFont, Text as SKText, vec } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import SoundPlayer from "react-native-sound-player";

import { mainText, touchableMediaData } from '../../types';
import { normalizeText } from '../../utils/story';
import { DEGREE, SCALE } from '../../config';
import { stringArrayToPolygonArray } from './utils';
import { useAnimatedHighlight, useTextEffect } from './globalStates/index';

type Props = {
  mainText: [{ w: string }],
  gestureHandler: any,
  deviceHeight: number,
  scale: number,
  pageTouches: any,
}

export default function TouchablesLayer({ mainText, pageTouches, gestureHandler, deviceHeight, scale }: Props) {
  //floating text that appear when use press on screen's item
  const [popUpText, setPopUpText] = useState<touchableMediaData>({
    audio: '',
    text: '',
    config: { x: 0, y: 0, rotate: 0 }
  });

  var { verticlesArray, touchableData } = stringArrayToPolygonArray(pageTouches, deviceHeight, scale);

  const [target, setTarget] = useState<[x: number, y: number]>([0, 0]);

  const pointInPolygon = require('point-in-polygon');

  const setTextEffect = useTextEffect((state:any) => state.setEffectIndex);

  const setAnimatedOn = useAnimatedHighlight((state: any) => state.setAnimatedOn);

  // when user tap on screen , check if the target is on a touchable area
  useEffect(() => {
    verticlesArray.map((v, i) => {
      //if user touch to a touchable area
      if (pointInPolygon(target, v)) {
        let currentEffect = touchableData[i];
        try {
          SoundPlayer.playUrl(currentEffect.audio); //play sound 
          let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
            console.log(target);
            setPopUpText(touchableData[i]);// set pop up text
            mainText.map((mt, k) => {
              //highlight the word if the word chosen match the word in top-text
              if (normalizeText(mt.w) == normalizeText(touchableData[i].text)) {
                setTextEffect(k); 
                setAnimatedOn(true); //trigger the animation
              }
            })
          });
          let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
            setPopUpText({ audio: '', text: '', config: { x: 0, y: 0, rotate: 0 } }); //reset state
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

  /** tapping processing here **/
  const onTap = Gesture.Tap()
    .onStart((e) => {
      setTarget([e.absoluteX / SCALE, e.absoluteY / SCALE]);
    })

  useEffect(() => {
    gestureHandler(onTap); //export gesture
  }, [])

  return (
    <SKText
      text={popUpText?.text}
      origin={vec(popUpText.config.x * scale, popUpText.config.y * scale)}
      font={useFont(require('../../assets/The-fragile-wind.ttf'), deviceHeight * 0.08)}
      x={popUpText.config.x * scale}
      y={popUpText.config.y * scale}
      transform={[{ rotate: popUpText.config.rotate * DEGREE }]} />
  )
}