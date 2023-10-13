import { Dimensions, StyleSheet } from "react-native";
import { MAINCOLOR } from "../../../config";

const {width, height} = Dimensions.get('window');

export const LoadingStyle = StyleSheet.create({
  screen: {
    height: height ,
    width: width,
    position: 'absolute',
    backgroundColor:'white',
    zIndex:100
  },
  image:{
    height: height *0.25
  },
  progressBar:{
    backgroundColor:'#d2d2d2',
    borderRadius: 10,
    height: height *0.05,
    width: width*0.85,
    borderWidth:2,
    borderColor: 'white',
    overflow: 'hidden'
  },
  percent:{
    color:'black'
  },
  runProgress:{
    backgroundColor:MAINCOLOR,
    borderRadius: 10,
    height: height *0.05,
    width: width*0.85,
    borderColor: 'white',
    borderRightWidth:2,
  },
  imageBound:{
    height: height *0.25,
    width: height *0.25,
    borderRadius: 100,
    overflow: 'hidden',
    alignContent:'center',
    alignItems:'center',
  },
  top: {
    flex: 1,
  },
  mid: {
    flex: 2,
    alignContent:'center',
    alignItems:'center'
  },
  bottom: {
    flex: 2,
    alignContent:'center',
    alignItems:'center',
  },
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
});