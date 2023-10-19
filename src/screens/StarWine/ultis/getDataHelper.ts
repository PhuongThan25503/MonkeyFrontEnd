import axios from "axios";
import { DataSet } from "../FilterBox";

export const getCurrentDate = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date
}

export const getTomorrowDate = () => {
  var today = new Date();
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  var date = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
  return date;
}

const BROWSER_UTC = 420;

export const dataSetToApiUrl = (dataSet: DataSet) => {
  const api = 
  `https://starwinelist.com/api/map/venues?` +
  `time_range=${dataSet.timeStart}%2C${dataSet.timeEnd}` +
  `&date=${dataSet.chosenDay.toStringValue}&time_tab=${dataSet.chosenTime.keyname}` +
  `&day_tab=${dataSet.chosenDay.keyname}` +
  `&time_start=${dataSet.timeStart}` + 
  `&time_end=${dataSet.timeEnd}` + 
  `&browser_utc=${BROWSER_UTC}`;
  return api;
}

export type SimpleMarker = {
  lat: number,
  lng: number
}

export const getAllMarker = async (apiUrl: string) => {
  const response = await axios.get(apiUrl)
  const markerList = await response.data.data.map((mark: any) => {
    return {lat:mark.lat, lng:mark.lng}
  })
  return markerList;
}