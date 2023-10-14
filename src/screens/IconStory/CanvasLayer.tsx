import { useState } from "react";

import { Canvas } from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import PageCurlLayer from "./PageCurlLayer";
import TouchablesLayer from "./TouchablesLayer";

export default function CanvasLayer({ deviceWidth, deviceHeight, setPageNum, children, mainText, pageTouches, scale }: any) {
  const [customGesture, setGesture] = useState<any[]>([]);

  const getGestureHandler = (gestureFromChild: any) => {
    setGesture((prew) => [...prew, gestureFromChild]);
  }

  const pageDirection = (direction: { action: string, status: number }) => {
    setPageNum(direction.status);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Race(...customGesture)}>
        <Canvas style={{ height: deviceHeight, width: deviceWidth }}>
          {children}
          <PageCurlLayer
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            pageDirection={pageDirection}
            gestureHandler={getGestureHandler}>
          </PageCurlLayer>
          {pageTouches && <TouchablesLayer
            pageTouches={pageTouches}
            mainText={mainText}
            gestureHandler={getGestureHandler}
            deviceHeight={deviceHeight}
            scale={scale} />}
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}