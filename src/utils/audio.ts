import { IP } from "../config";
import axios from "axios";
import { AudioInterface} from "../types";

export const getAllAudio = async () => {
  try {
    let apiUrl = IP + '/api/getAllAudio';
    let response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const defaultAudio: AudioInterface = {
  audio_id: 0,
  audio: 'N/A',
  textId: 0,
  text: 'N/A',
}