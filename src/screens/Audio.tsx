import React, { useEffect, useState } from "react";
import { AudioInterface } from "../types";
import { defaultAudio, getAllAudio } from "../utils/audio";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioItem from "../components/Audios/AudioItem";
import { ScrollView } from "react-native";
import { HomeStyle } from "./styles/HomeStyle";
import { AudioItemStyle } from "../components/Audios/style/AudioItemStyle";

function Audio() {
  const [Audio, setAudio] = useState<AudioInterface[]>([defaultAudio]);

  useEffect(() => {
    getAllAudio().then(data => setAudio(data));
  }, [])


  return (
    <SafeAreaView style={HomeStyle.screen}>
      <ScrollView>
        {
          Audio.map((a, value) =>
            value % 2 ==0 ?
            <AudioItem style={{}} key={a.audio_id} audio={a.audio} audio={a}></AudioItem>
            :
            <AudioItem style={AudioItemStyle.oddItemStyle} key={a.audio_id} audio={a}></AudioItem>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Audio;