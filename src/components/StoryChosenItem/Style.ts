import { Dimensions, StyleSheet } from "react-native";
import { MAINCOLOR } from "../../config";

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
  infoBound:{
    flex: 5,
    marginLeft: 30
  },
  title:{
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18
  },
  ViewWrap: {
    width: '90%',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: MAINCOLOR,
    borderRadius: 20
  },
  ViewImage:{
    flex:3,
    alignItems: 'center',
    alignContent: 'center',
    height: '100%'
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
  buttonBound:{
    flexDirection: 'row'
  },
  textBound:{
    marginBottom: 10,
  },
  TouchableBound:{
    overflow: "hidden",
    alignItems: 'center',
    alignContent: 'center'
  },
  image:{
    position:'absolute',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  ChosenItem:{

  },
  nonChosenItem:{
    height: '20%',
    width: '20%',
    alignItems: 'center',
    alignContent: 'center'
  },
  text:{
    margin: 10,
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  textBox:{
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#4bffd9',
    flexDirection: 'row',
    alignItems: 'center',
  }
})