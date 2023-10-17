import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window')
export const StoryItemStyle = StyleSheet.create({
  overOuterBound:{
    borderColor: '#90ebfe',
    borderWidth: 1,
    borderRadius: 10, 
    overflow: 'hidden',
    margin: '1.2%',
    backgroundColor: 'white',
  },
  overOuterLayer1:{
    flex: 1,
    width: '95%',
    height: '100%',
    borderColor: '#90ebfe',
    borderWidth: 1,
    borderRadius: 10, 
    overflow: 'hidden'
  },
  text:{
    color: '#90ebfe',
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  button:{
    marginBottom: '7.5%',
  },
  overBound:{
    width: '100%',
    height:'85%',
  },
  image:{
    width: '100%',
    height:'100%',
    borderRadius: 10, 
  },
  playButton:{
    width:'1.5%',
    height: '1.5%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: '5%'
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
  },
  taskStyle:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    position: 'absolute',
    height: '100%',
    opacity: 0.8,
  },
  touchBound:{
    flex:1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList:{
    marginLeft: width*0.04,
  },
});