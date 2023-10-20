import { StyleSheet } from "react-native"; 

export const MainButtonStyle = StyleSheet.create({
  wrapBox:{
    borderWidth: 1,
    borderColor: "#ab2430",
    borderRadius: 5,
    margin: 5,
    padding: 10,
    height: 50,
    backgroundColor:"white",
    alignItems: 'center',
    alignContent: 'center'
  },
  buttonText:{
    color: '#ab2430',
    fontSize : 10
  },
  chosenWrapBox:{
    borderWidth: 1,
    borderColor: "#ab2430",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    height: 50,
    backgroundColor:"#ab2430",
    alignItems: 'center',
    alignContent: 'center'
  },
  ChosenButtonText:{
    color: 'white',
    fontSize : 10,
  }
})