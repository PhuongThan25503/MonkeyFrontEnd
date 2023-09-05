import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "react-native";
import { AudioItemStyle } from "./style/AudioItemStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SoundPlayer from 'react-native-sound-player'
import TrackPlayer from "react-native-track-player";
import { AudioInterface } from "../../types";

type Props = {
  audio: AudioInterface,
  style: ViewStyle,
}

function AudioItem({ audio, style}: Props) {

  const handlePress = async () => {
    await SoundPlayer.playUrl(audio.audio);
  }

  return (
    <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(style, AudioItemStyle.button)}>
      <View style={AudioItemStyle.playButton}>
        <FontAwesome name='caret-down' style={AudioItemStyle.icon}></FontAwesome>
      </View>
      <Text style={AudioItemStyle.text}>
        {audio.audio_id}: {audio.text}
      </Text>
    </TouchableOpacity>
  );
}
export default AudioItem;