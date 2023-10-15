import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen');

export const LastPageStyle = StyleSheet.create({
  screen:{
    width: width,
    height: height,
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
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
  button:{
    
  },
  buttonField:{
    flex:2,
    alignItems: 'center',
    alignContent: 'center',
  },
  coinField:{
    flex:2,
    width: width*0.1,
    height:  height,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection:'column',
  },
  coin:{
    width: width*0.1,
    height:  width*0.1,
  },
  coinBound:{
    flex:1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection:'row',
  },
  text:{
    flex:1,
    color:'black',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'red', 
    textShadowOffset: { width: -1, height: 1 }, 
  }
});