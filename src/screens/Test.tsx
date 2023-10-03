import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StatusBar, StyleSheet, View } from "react-native";
import RNFS from 'react-native-fs';
import { useStore } from "zustand";



export default function Test() {
  const [image, setImages] = useState('');
  useEffect(() => {
    downloadImage("https://res.cloudinary.com/dck2nnfja/image/upload/v1693969152/MonkeyApp/Story/1/5.png","story",1, "testImage.png");
    setImages(`${RNFS.DocumentDirectoryPath}/story/1/testImage.png`);  
    console.log(image);
  }, []) 
  return (
    <View style={styles.container}> 
      <StatusBar hidden={true}></StatusBar>
      <Image source={{ uri: `file://${image}` }} style={{ height:Dimensions.get('window').height , width: Dimensions.get("window").width}} />
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

const downloadImage = async (url: string,dir : string,id: number, name:string) => {
  try {
    const response = await fetch(url);
    const fileName = `${name}`;
    const path = `${RNFS.DocumentDirectoryPath}/${dir}/${id}/${fileName}`;
    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${dir}/${id}`);
    const blob = await response.blob();
    const reader = new FileReader(); 
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = (reader.result as string).split(',')[1];
      await RNFS.writeFile(path, base64data, 'base64');
      console.log('Image saved successfully!');
    };
  } catch (error) {
    console.log(error);
  }
};