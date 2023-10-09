import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const StoryDetailStyle = StyleSheet.create({
  screen : {
    flex:1,
    backgroundColor: 'white'
  },
  canvas: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'red'
  },
  onHightLight: {
    color: 'red',
  }
});