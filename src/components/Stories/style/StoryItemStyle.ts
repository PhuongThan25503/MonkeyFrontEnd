import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')

export const StoryItemStyle = StyleSheet.create({
  overOuterBound:{
    width: width * 0.21,
    height: height * 0.5,
    borderColor: '#90ebfe',
    borderWidth: 1,
    borderRadius: 10, 
  },
  text:{
    color: '#90ebfe',
    fontSize: width * 0.025,
    marginLeft: width * 0.005,
    fontWeight: 'bold',
  },
  button:{
    marginBottom: width*0.075,
  },
  overBound:{
    width: '100%',
    height:'100%',
  },
  image:{
    width: '100%',
    height:'100%',
    borderRadius: 15
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