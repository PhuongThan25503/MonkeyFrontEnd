import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const StoryDetailStyle = StyleSheet.create({
  screen:{
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  screenBound:{
    transform: [{rotate: '90deg'}],
  },
  text:{
    color: 'black'
  },
  screenBox:{
    //transform: [{rotate: '90deg'}],
    borderWidth: 2,
    borderColor: 'black'
  },
  backgroundImage:{
    width: height,
    height: width,
  },
  touchable:{
    position : 'absolute', 
  }
});