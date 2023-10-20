import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import PushNotification from "react-native-push-notification";
import { TouchableOpacity } from "react-native-gesture-handler";
import Octicons from "react-native-vector-icons/Octicons";

import { ItemType } from "../style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getIconStory } from "../../../data/dataPreparation/iconStory";
import { getStaticStory } from "../../../data/dataPreparation/staticStory";
import { BasicStoryInfo } from "../../../types";
import { NOTICHANNEL } from "../../../config";
import { Linking } from "react-native";

type Props = {
  story: BasicStoryInfo
}
type TypeDownloadFunction = {
  [key: number]: (id: number) => Promise<void>;
};


const typeDownLoadFunction: TypeDownloadFunction = {
  1: getStaticStory,
  2: getIconStory
}

export default function DownLoadButton({ story }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  function handlePress(): void {
    setIsLoading(!isLoading);
  }

  const downLoadStory = async () => {
    if (isLoading) {
      await typeDownLoadFunction[story.type_id](story.story_id).then(() => {
        setIsLoading(false);
        PushNotification.localNotification({
          channelId: NOTICHANNEL,
          title:`Your story "${story.name}" is ready`,
          message: "Tap here to play",
          playSound: true,
          soundName: 'default',
          userInfo: { link: "https://monkeyapp.page.link/uy1b/" + story.story_id },
        });
      })
    }
  }

  useEffect(() => {
    if (isLoading) {
      downLoadStory();
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isLoading])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(ItemType.TouchableBound, ItemType.ChosenItem)}>
      <View style={ItemType.textBox}>
        <Text>  </Text>
        {
          isLoading ?
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <MaterialCommunityIcons name="loading" size={35} color={'white'} />
            </Animated.View>
            :
            <Octicons name="download" size={35} color={'white'}></Octicons>

        }
        <Text style={ItemType.text}>DOWNLOAD</Text>
      </View>
    </TouchableOpacity>
  )
}