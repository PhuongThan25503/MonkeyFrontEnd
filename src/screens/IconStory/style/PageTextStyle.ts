import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen');
export const wordStyle = StyleSheet.create({
  default: {
    color: 'black',
    fontSize: 25,
    marginTop: 35
  },
  highlighted: {
    color: 'red',
    fontSize: 25,
    marginTop: 35
  },
  icon: {
    backgroundColor: 'aqua',
    padding: 15,
    borderRadius: 20
  },
  image: {
    width: width,
    height: height,
    position:'absolute'
  }
});