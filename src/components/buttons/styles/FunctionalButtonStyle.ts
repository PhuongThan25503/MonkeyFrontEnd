import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const FunctionalButtonStyle = StyleSheet.create({

  buttonBound: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'green',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize:width * 0.1,
  }

});