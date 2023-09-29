import { translate } from "@shopify/react-native-skia";
import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const AudioFormStyles = StyleSheet.create({
  screen:{
    height: height,
    flex:1,
  },
  text: {
    color: 'black',
    margin:5
  },
  title: {
    position: 'absolute',
    color: 'white',
    margin:5,
    fontSize: height * 0.05,
    fontWeight: 'bold'
  },
  input: {
    borderRadius: 10,
    width: '100%',
    color: 'black',
    borderWidth: 1,
    marginTop:5,
    marginBottom: 15,
  },
  input_box:{
    width: '80%',
  },
  optionButton:{
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image:{
    top: 0,
    height:height,
    width: width,
    position: 'absolute',
  },
  inputField:{
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 50,
    height: height,
    opacity: 0.85
  },
  topField:{
    height:'22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default AudioFormStyles;