import { Dimensions, StyleSheet } from "react-native";

export const ItemType = StyleSheet.create({
  ItemStyleBoundCover:{
    width: '60%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#90ebfe',
    borderWidth: 2,
    borderRadius: 25
  },
  ItemStyleBound:{
    width: '80%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#90ebfe',
    borderWidth: 2,
    borderRadius: 25,
    
  },
  TouchableBound:{
    alignItems: 'center',
    alignContent: 'center',
  },
  image:{
    position:'absolute',
    borderRadius: 25,
    width: '100%',
    height: '100%',
  },
  ChosenItem:{
    width: '50%',
    height: '90%'
  },
  nonChosenItem:{
    height: '20%',
    width: '20%',
    alignItems: 'center',
    alignContent: 'center'
  },
  text:{
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  textBox:{
    width: '100%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#4bffd9'
  }
})