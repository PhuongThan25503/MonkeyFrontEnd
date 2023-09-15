import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Svg, Path } from "react-native-svg";
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
  console.log(d);
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

  useEffect(()=> {
    if(!pages)
    return; 
    setImage(pages[0]?.background);
  },[])

  return (
    <View style={styles.container}>
      <Canvas style={{ height: deviceOrientations.height, width: deviceOrientations.width }}>
        <Image x={0} y={0} fit={'fitHeight'} height={deviceOrientations.height} width={deviceOrientations.width} image={useImage(image)}>
        </Image>
      </Canvas>
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