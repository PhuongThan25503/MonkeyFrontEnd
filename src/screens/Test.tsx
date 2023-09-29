import { Canvas, useImage, Image, Path, SweepGradient, vec, Shadow, Rect } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getPagesByStoryId } from "../utils/story";

const path3 = [
  "{694,465}",
  "{680,471}",
  "{674,471}",
  "{673,467}",
  "{677,462}",
  "{683,458}",
  "{712,444}",
  "{735,435}",
  "{744,425}",
  "{753,419}",
  "{765,415}",
  "{770,418}",
  "{774,422}",
  "{775,426}",
  "{770,432}",
  "{755,439}",
  "{745,439}",
  "{740,440}",
  "{695,463}"
];

// Convert the array of strings to a single string with M and L commands
const d = path3.reduce((acc, curr, index) => {
  // Remove the curly braces and split by comma
  const [x, y] = curr.replace(/[{}]/g, "").split(",");
  // If it is the first point, use M command
  if (index === 0) {
    return `M${x}.${y}`;
  }
  // Otherwise use L command
  return `${acc}l${x}.${y}`;
}, "");

export default function Test() {
  //console.log(d);
  const [pages, setPages] = useState<any[]>();

  const deviceOrientations = { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height };
  //const image = useImage('https://res.cloudinary.com/dck2nnfja/image/upload/v1693969149/MonkeyApp/Story/1/1.png');
  const [image, setImage] = useState<string>();
  //#1 : initialize page
  //initialize basic info of the page
  const initializePage = async () => {
    await getPagesByStoryId(1)
      .then(data => {
        setPages(data.page);
      })
  };
  useEffect(() => {
    initializePage();
  }, []);
  const [animPath, setAnimPath] = useState('');
  const [hiddenScene, setHiddenScane] = useState(deviceOrientations.width);
  useEffect(() => {
    if (!pages)
      return;
    setImage(pages[0]?.background);
  }, [pages])


  const gestureAnim = (dir: number, absX: number, absY: number) => {
    if (dir == 1) {//next
      let A = {x: absX, y: absY}
      let C = {x: (deviceOrientations.width - ((deviceOrientations.width - absX + absY / 4) / 7)), y: 0}
      let B = {x: A.x + (C.x - A.x)/4,y: deviceOrientations.height}
      let fixCurve1 = {x : A.x +(C.x - A.x)/2 , y: C.y + (A.y- C.y)/1.5};
      let fixCurve2 = {x: B.x , y: A.y + (B.y - A.y)/1.25};
      setAnimPath('M ' + A.x + ' '+ A.y + ' Q ' + fixCurve1.x + ' ' + fixCurve1.y + ' '+ C.x + ' ' + C.y + ' L '+B.x + ' ' + B.y + ' Q '+ fixCurve2.x + ' '+fixCurve2.y + ' ' + A.x + ' ' + A.y + ' Z');
    }
  }
  const [gestureFlag, setGestureFlag] = useState(0); //flag for gesture decide if trigger animation or not
  
  const onDrag = Gesture.Pan()
    .onStart((e) => {
      console.log('panning...');
      if (e.absoluteX > deviceOrientations.width - deviceOrientations.width / 3) setGestureFlag(1); // if gesture is swipe from left to right , it means co to previous page
      if (e.absoluteX < deviceOrientations.width / 3) setGestureFlag(-1); // if gesture is swipe from right to left, it means go to right page
    })
    .onUpdate((e) => {
      gestureAnim(gestureFlag, Math.round(e.absoluteX), Math.round(e.absoluteY))
    })
    .onEnd(() => {
      setAnimPath('');
    })
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
      <GestureHandlerRootView>
        <GestureDetector gesture={onDrag}>
          <Canvas style={{ height: deviceOrientations.height, width: deviceOrientations.width }}>
            <Image x={hiddenScene} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(image)}>
            </Image>
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
          </Canvas>
        </GestureDetector>

      </GestureHandlerRootView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});