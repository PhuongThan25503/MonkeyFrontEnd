import { Dimensions, StyleSheet } from "react-native";

export const ItemType = StyleSheet.create({
  ItemStyle:{
    width: '75%',
    height: '70%',
    backgroundColor: 'white',
  },
  ItemStyleBound:{
    width: '30%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center'
  },
  image:{
    width: '100%',
    height: '100%',
  },
  ChosenItem:{
    width: '50%',
    height: '90%'
  },
  nonChosenItem:{
    height: '40%',
    width: '25%',
    alignItems: 'center',
    alignContent: 'center'
  }
})