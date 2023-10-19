import { getCurrentDate, getTomorrowDate } from "./getDataHelper"

interface KeyExporter {
  [key: number] : string
}

export const DayValueDictionary : KeyExporter = {
  0: getCurrentDate(),
  1: getTomorrowDate(),
}

export const DayValueTranform =(n: number)=>{

  return DayValueDictionary[n];
}

// export const TimeValueDictionary : KeyExporter = {
//   0: {value:"none", type: "time_tab=open-now"},
//   1: {value:"none", type: "time_tab=lunch"},
//   2: {value:"none", type: "time_tab=dinner"},
//   3: {value:"none", type: "time_tab=custom"},
// }
