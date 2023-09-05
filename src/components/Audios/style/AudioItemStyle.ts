import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const AudioItemStyle = StyleSheet.create({
  text:{
    color: 'black'
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  playButton:{
    width:width*0.15,
    height:width*0.15,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 2,
    marginTop: width * 0.05,
    margin: width * 0.05
  },
  icon:{
    fontSize: 45,
    color: 'red',
    transform: [{rotate: '-90deg'}],
  },
  oddItemStyle:{
    backgroundColor: '#cccccc'
  }
});