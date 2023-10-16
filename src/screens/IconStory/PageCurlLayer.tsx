import { useEffect, useState } from 'react';

import { Path, Shadow } from '@shopify/react-native-skia';
import { Gesture } from 'react-native-gesture-handler';
import { useTextEffect } from './globalStates';

export default function PageCurlLayer({
  deviceWidth,
  deviceHeight,
  setZIndex,
  pageDirection,
  gestureHandler }: any) {
  const [animPath, setAnimPath] = useState('');
  var gestureDir = 0;
  var nextPageFlag = false; // flag for going to next page or not
  var postPageFlag = false; // flag for going to previous page or not

  const setEffectIndex = useTextEffect((state:any) => state.setEffectIndex)
  const gestureAnim = (dir: number, absX: number, absY: number) => {
    if (dir == 1) {//next
      //if user intend to go to the next page, trigger the animation 
      if (absX >= deviceWidth / 1.6) {
        if (dir == 1) {//next
          let A = { x: absX, y: absY }
          let C = { x: (deviceWidth - ((deviceWidth - absX + absY / 4) / 7)), y: 0 }
          let B = { x: A.x + (C.x - A.x) / 4, y: deviceHeight }
          let fixCurve1 = { x: A.x + (C.x - A.x) / 2, y: C.y + (A.y - C.y) / 1.5 };
          let fixCurve2 = { x: B.x, y: A.y + (B.y - A.y) / 1.25 };
          setAnimPath('M ' + A.x + ' ' + A.y + ' Q ' + fixCurve1.x + ' ' + fixCurve1.y + ' ' + C.x + ' ' + C.y + ' L ' + B.x + ' ' + B.y + ' Q ' + fixCurve2.x + ' ' + fixCurve2.y + ' ' + A.x + ' ' + A.y + ' Z');
        }
      }
      //if user want , then change page
      if (absX < deviceWidth / 1.6) {
        nextPageFlag = true;
      } else {
        nextPageFlag = false;
      }
    }
    if (dir == -1) {
      //if user intend to go to the next page, trigger the animation 
      if (absX <= deviceWidth / 3) {
        setAnimPath('M ' + absX + ' ' + absY + ' L ' + (absX * 0.5) + ' ' + deviceHeight + ' L ' + (absX * 0.3) + ' 0' + ' Z');
      }
      //if user want , then change page
      if (absX > deviceWidth / 3) {
        postPageFlag = true;
      } else {
        postPageFlag = false;
      }
    }
  }

  /**Drag gesture handler **/
  const onDrag = Gesture.Pan()
    .onStart((e) => {
      setZIndex(10);
      if (e.absoluteX > deviceWidth - deviceWidth / 3) gestureDir = 1; // if gesture is swipe from left to right , it means co to previous page
      if (e.absoluteX < deviceWidth / 3) gestureDir = -1; // if gesture is swipe from right to left, it means go to right page
    })
    .onUpdate((e) => {
      if (gestureDir != 0) { // if use intend to change page , trigger the aim
        gestureAnim(gestureDir, Math.round(e.absoluteX), Math.round(e.absoluteY))
      }
    })
    .onEnd((e) => {
      setZIndex(1);
      if (nextPageFlag) {
        setEffectIndex(-1);
        pageDirection({ status: 1, action: "next page" }); // status 
      }
      if (postPageFlag) {
        setEffectIndex(-1);
        pageDirection({ status: -1, action: "post page" }); // status
      }
      nextPageFlag = false;
      postPageFlag = false;
      gestureDir = 0;
      setAnimPath('');
    })

  useEffect(() => {
    gestureHandler(onDrag); // send gesture to parent
  }, [])
  return (
    <Path
      path={animPath}
      color={'#eee4b0'}
    >
      <Shadow
        dx={25}
        dy={15}
        blur={35}
        color="black"
      />
      <Shadow
        inner
        dx={-35}
        dy={0}
        blur={25}
        color="#93b8c4"
      />
    </Path>
  )
}