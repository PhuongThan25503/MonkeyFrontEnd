import { StyleSheet } from "react-native";
export const StoryStyle = StyleSheet.create({
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
  backButton:{
    position: 'absolute',
    top: 0,
    borderWidth:2,
    borderColor: 'white',
    borderRadius: 100,
    padding: 15

  },
  ViewWrap: {
    width:'100%',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
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
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap' ,
    alignContent: 'center',
    borderWidth: 2,
    borderColor: 'yellow'
  }
});
