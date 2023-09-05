import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')

export const StoryItemStyle = StyleSheet.create({
  text:{
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: width * 0.05,
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: '#8decff',
    marginBottom: width*0.05,
  },
  overBound:{
    width:width*0.4,
    height:width*0.4,
  },
  image:{
    width:width*0.4,
    height:width*0.4,
    borderRadius: 15
  },
  storyItem:{
    flexDirection: 'row'
  },
  decor1:{
    width:width*0.1,
    height:width*0.1,
    backgroundColor: '#fcffc3',
    position: "absolute",
    zIndex:10,
    right:0,
  },
  decor2:{
    width:width*0.1,
    height:width*0.1,
    backgroundColor: '#fcffc3',
    position: "absolute",
    zIndex:10,
    right:0,
    transform: [{rotate :'45deg'}]
  },
  playButton:{
    width:width*0.15,
    height:width*0.15,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: width * 0.05
  },
  icon:{
    fontSize: 45,
    color: 'white',
    transform: [{rotate: '-90deg'}],
  },
  infoField:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});