import { IP } from "../config";
import axios from "axios";
import { AudioInterface, audioData } from "../types";
import { getAPIToken } from "./authenticate";

export const getAllAudio = async () => {
  try {
    let apiUrl = IP + '/api/getAllAudio';
    let response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addNewAudio = async (data: audioData) => {
  let audio = {
    audio: data.audio,
    sync_data: data.syncData,
    duration: data.duration
  }
  console.log(audio);
  try {
    let apiUrl = IP + '/api/addNewAudio';
    let token = await getAPIToken();
    let config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    let response = axios.post(apiUrl, audio, config);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const defaultAudio: AudioInterface = {
  audio_id: 0,
  audio: 'N/A',
  textId: 0,
  text: 'N/A',
}