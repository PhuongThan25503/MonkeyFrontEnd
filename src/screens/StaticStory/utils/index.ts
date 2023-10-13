import { useState } from 'react';

import { mainText, touchableMediaData } from '../../../types';
import SoundPlayer from 'react-native-sound-player';
import RNFS from 'react-native-fs';
import { normalizeText } from '../../../utils/story';

/** change raw data to number array  (performance)**/
export const verticlesToPurePath = (data: string[], height: number, scale: number, xFix: number): number[] => {
  height = Math.round(height / scale);
  let newData: number[] = data?.map((d: any, i: number) => { //data in array of number
    let [a, b] = d.split(',');
    [a, b] = [a.replace(/\D/g, ''), b.replace(/\D/g, '')]; //change '{a,b}' to [a,b]
    let newX = (Number(a) - xFix); //config x depend on screen
    let newY = (height - Number(b)); //config y depend on screen
    d = [newX, newY];
    return d; //element of array number
  })
  return newData;
}

/** render touchable into an array **/
export const stringArrayToPolygonArray = (pageTouches: any, height: number, scale: number) => {
  let tempArray: number[][] = [];
  let tempTouchData: touchableMediaData[] = [];
  pageTouches?.length > 0 && pageTouches.map((t: any, i: number) => {

    //get the media data
    tempTouchData.push({ text: t.text.text, audio: t.text.audio.audio, config: t.config })

    //get the data of verticle for drwing path
    tempArray.push(verticlesToPurePath(t.data, height, scale, 0));

  })

  return { verticlesArray: tempArray, touchableData: tempTouchData };
}

/** play the main audio of the page **/
export const playMainAudio = (text: any[], wordEffect: boolean[], setWordEffect: (wordEffect: boolean[]) => void) => {
  const [currentMainText, setCurrentMainText] = useState(0)
  try {
    SoundPlayer.playUrl(text[currentMainText].audio);

    //when finish loading, play audio
    let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
      console.log("start");
      _onLoadingSubscription.remove();
      playEffectText(text[currentMainText], wordEffect, setWordEffect);
    });

    //when finish playing audio , remove listener to avoid error
    let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
      _onLoadingSubscription.remove(); //remove event listener 
      _onFinishSubscription.remove(); //remove event listener 

      if (currentMainText < text.length - 1) {
        setCurrentMainText(currentMainText + 1);
      } else {
        //return value here
      }
    });
  } catch (error) {
    console.log(error);
  }
}

/**  play effect text when sound start **/
export const playEffectText = (mainText: mainText, wordEffect: boolean[], setWordEffect: (wordEffect: boolean[]) => void) => {
  let startTime = performance.now();
  let timer = setInterval(updateTimer.bind(null, startTime), 10);
  let wordIndex = 0;
  let syncData = mainText.syncData;
  let switchEffectFlag = true; // flag to reduce the render times
  function updateTimer(startTime: number) {

    // Get the current time
    let currentTime = performance.now();
    // Calculate the elapsed time
    let elapsedTime = Math.floor(currentTime - startTime);
    if (elapsedTime >= mainText.duration) { // when reach the end, remove timer
      (wordEffect?.map((w) => false))
      clearInterval(timer);
    }
    if (syncData[wordIndex]?.s <= elapsedTime && switchEffectFlag) {
      switchEffectFlag = false;
      console.log(wordIndex);
      setWordEffect(wordEffect?.map((w, index) => (index == wordIndex) ? true : false))
      if (wordIndex < syncData.length) { // if not yet reach limit , go to next
        wordIndex++;
      }
    } else {
      if (wordIndex == syncData.length) // if reach limit ,stop 
        switchEffectFlag = false;
      else {
        switchEffectFlag = true; // if not , go to the next
      }
    }
  }
}

const downloadImage = async (url: string, dir: string, id: number, name: string) => {
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

// export const IconizeSyncData = (tempTextData: any, iconList: string[][]) => {
//   let indexer = -1; //true index for icon 
//   tempTextData.map((t: any, index: number) => {
//     iconList.map(i => {
//       let streak = true; // in case the icon text has many words, check
//       let n = 0; // count the word of the icon text
//       while (streak) {
//         if (normalizeText(tempTextData[index + n].w) == normalizeText(i[n])) {
//           indexer = indexer + 1;
//           if (n > 0) {
//             tempTextData[index].e = tempTextData[index + n].e;
//             indexer = indexer - 1;
//             tempTextData.splice(index + n, 1);
//           }
//           if (n == 0) {
//             tempTextData[index].w = "<icon>" + indexer;
//           }
//         } else {
//           streak = false;
//         }
//         n = n + 1;
//       }
//     })
//   })
//   //console.log(tempTextData)
//   return tempTextData[0];
// }

export const IconizeSyncData = (tempTextData: any, iconList: string[][]) => {
  tempTextData.map((t: any, index: number) => {
    iconList.map(i => {
      let streak = true; // in case the icon text has many words, check
      let n = 0; // count the word of the icon text
      while (streak) {
        if (normalizeText(tempTextData[index + n].w) == normalizeText(i[n])) {
          if (n > 0) {
            tempTextData[index].e = tempTextData[index + n].e;
            tempTextData[index].w = tempTextData[index].w + ' ' + tempTextData[index + n].w;
            tempTextData.splice(index + n, 1);
          }
        } else {
          streak = false;
        }
        n = n + 1;
      }
    })
  })
  return tempTextData[0];
}

/** play the main audio of the page **/
export const playTextAudio = (sound: any) => {
  try {
    SoundPlayer.playUrl(sound);

    //when finish loading, play audio
    let _onLoadingSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', (data) => {
      _onLoadingSubscription.remove();
    });

    //when finish playing audio , remove listener to avoid error
    let _onFinishSubscription = SoundPlayer.addEventListener('FinishedPlaying', (data) => {
      _onLoadingSubscription.remove(); //remove event listener 
      _onFinishSubscription.remove(); //remove event listener 

    });
  } catch (error) {
    console.log(error);
  }
}