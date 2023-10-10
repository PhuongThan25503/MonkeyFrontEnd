import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')

export const StoryItemStyle = StyleSheet.create({
  overOuterBound:{
    width: width * 0.20,
    height: height * 0.5,
    borderColor: '#90ebfe',
    borderWidth: 1,
    borderRadius: 10, 
    overflow: 'hidden',
    margin: width * 0.012,
    backgroundColor: 'white',
  },
  overOuterLayer1:{
    width: width * 0.19,
    height: height * 0.5,
    borderColor: '#90ebfe',
    borderWidth: 1,
    borderRadius: 10, 
    overflow: 'hidden'
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
    borderRadius: 10, 
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
  },
  bookMarkIcon:{
    position: 'absolute',
    left: 10,
    top: 0,
    transform: [{scaleY: 3}]
  },
  bookMarkWrap:{
    width: 30,
    position: 'absolute',
    left: 10,
    top: -10,
  },
  bookMarkText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    left: 9,
    top: 5,
    textAlign:'center'
  }
});