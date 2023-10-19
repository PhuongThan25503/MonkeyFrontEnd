import { getCurrentDate, getTomorrowDate } from "./getDataHelper"

interface KeyExporter {
  [key: number] : {value: string, type: string }
}

export const DayValueDictionary : KeyExporter = {
  0: {value:"date=" + getCurrentDate, type: "day_tab=today" },
  1: {value:"date=" + getTomorrowDate, type: "day_tab=tomorrow" },
  2: {value:"date=" + getTomorrowDate, type: "day_tab=custom" }
}

export const DayValueTranform =(n: number)=>{
  return DayValueDictionary[n];
}

export const TimeValueDictionary : KeyExporter = {
  0: {value:"none", type: "time_tab=open-now"},
  1: {value:"none", type: "time_tab=lunch"},
  2: {value:"none", type: "time_tab=dinner"},
  3: {value:"none", type: "time_tab=custom"},
}

export const TimeValueTranform = (n: number) => {

}