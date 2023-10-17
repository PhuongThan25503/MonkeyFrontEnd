import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')
export const StoryListStyle = StyleSheet.create({
  text: {
    height: '25%',
    color: 'black',
    width: '100%',
  },
  proText:{
    textAlign:'center', 
    fontSize: 40, 
    color: 'white', 
    textShadowColor: 'rgba(144, 235, 255, 83)', 
    textShadowOffset: { width: -1, height: 1 }, 
    textShadowRadius: 10 
  },
  ViewWrap: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    backgroundColor: 'white',
  },
  BoundBox: {
    backgroundColor: 'white'
  },
  IndicatorContainer: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom:0,
  },
  SubBoundBox: {
    width:'100%',
    height: '100%',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  CanvasContainer:{
    position:'absolute',
    width:'100%',
    height: '100%',
  }, 
  ViewBound:{
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5%'
  },
  flatList:{
    marginLeft: width*0.04,
  },
  ScrollViewBound:{
    width: '100%',
    flexDirection: 'row',
    alignContent:'center',
    backgroundColor: 'white',
  },
  subScrollView:{
    paddingTop: 100,
    alignContent: 'center',
    width: width,
    alignItems: 'center',
  },
  TopDecor:{
    height: '25%',
    width: '100%',
    position: 'absolute',
    top: 0
  }
});
