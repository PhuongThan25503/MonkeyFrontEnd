import { StyleSheet } from "react-native";

export const CalendarStyle =  StyleSheet.create({
  boxWrap:{
    height: 40,
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10
  },
  boxSubWrap:{
    backgroundColor: 'white',
    height: 40,
    width: '88%',
    borderWidth: 2,
    borderColor: '#ab2430',
  },
  text:{
    color: '#ab2430',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
  screenBound:{
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'gray',
    zIndex: 10
  },
  mainBoxBound:{
    width: '90%',
    alignItems: 'center',
    alignContent: 'center',
  },
  calendarButton: {
    borderWidth: 2,
    borderColor: '#ab2430',
    width: '85%'
  }
})