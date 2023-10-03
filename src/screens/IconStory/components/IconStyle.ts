import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');
export const IconStyle = StyleSheet.create({
  image:{
    height: '100%',
    width: '100%',
    position: "absolute"
  },
  text:{
    width: 1000,
    textAlign: 'center',
    color: 'black',
    fontSize: width *0.02,
    position: "relative",
    bottom:0,
  },
  IconBound:{
    transform: [{scale: 0.7}],
    alignContent: 'center',
    alignItems: 'center'
  },
  IconTag:{
    alignContent: 'center',
    alignItems: 'center'
  }
});