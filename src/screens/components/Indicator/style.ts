import { Dimensions, StyleSheet } from "react-native";
const { height , width} = Dimensions.get('window')
export const IndicatorStyle = StyleSheet.create({
  text: {
    color: 'black'
  },
  BoundBox: {
    flexDirection:'row'
  },
  dotItem: {
    marginLeft: 5,
    marginRight:5
  }
});
