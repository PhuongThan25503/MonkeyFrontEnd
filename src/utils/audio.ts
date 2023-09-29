import { IP } from "../config";
import axios from "axios";
import { AudioInterface, audioData } from "../types";
import { getAPIToken } from "./authenticate";
import RNFS from "react-native-fs";
import { PERMISSIONS, check, request } from "react-native-permissions";
import { useCallback } from "react";
import DocumentPicker from 'react-native-document-picker';

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
    let response = await axios.post(apiUrl, audio, config);
    return response;
  } catch (e: any) {
    if (e.response.status == 401) {
      return {
        status: 401,
      }
    }
  }
}

export const addNewText = async (data: { text: string }) => {
  let text = {
    text: data.text,
  }
  try {
    let apiUrl = IP + '/api/addNewText';
    let token = await getAPIToken();
    let config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    let response = await axios.post(apiUrl, text, config);
    console.log(response.status);
    return response;
  } catch (e: any) {
    if (e.response.status == 401) {
      return {
        status: 401,
      }
    }
  }
}

export const defaultAudio: AudioInterface = {
  audio_id: 0,
  audio: 'N/A',
  textId: 0,
  text: 'N/A',
}



export const cloudinaryUpload = async (file: any) => {

  // Set Cloudinary credentials
  const cloudName = "dck2nnfja";
  const apiKey = "337676999889211";
  const preset = 'gaxpeofu';

  console.log(
    `path: ${file.uri}, type: ${file.type}, name: ${file.name}, size: ${file.size}`
  );

  await RNFS.stat(file.uri).then((data) => {
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  })
  // Create FormData object
  const formData = new FormData();

  formData.append('file', file.uri);
  formData.append('upload_preset', preset);
  formData.append('api_key', apiKey);

  // Send POST request
  await axios
    .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
    .then((response: any) => {
      // Handle response
      console.log(response.data);
    })
    .catch((error: any) => {
      // Handle error
      console.error(error);
    });
}

// Request storage permission
export const requestStoragePermission = async () => {
  try {
    // Check if permission is already granted
    const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (status === "granted") {
      return true;
    }
    // Request permission
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === "granted") {
      // Permission is granted, do something
      console.log("Storage permission granted");
      return true;
    } else {
      // Permission is denied, show a message
      console.log("Storage permission denied");
      return false;
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

