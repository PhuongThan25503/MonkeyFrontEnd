import { StyleSheet } from "react-native"; 

export const FilterBoxStyle = StyleSheet.create({
  screenBound:{
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  mainBoxBound:{
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  mainBox:{
    width: '80%',
    minHeight: '60%',
    backgroundColor: 'white',
  },
  fadedBackground:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.7
  }
})