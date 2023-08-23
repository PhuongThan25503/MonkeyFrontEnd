import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const loginStyles = StyleSheet.create({
  all:{
    backgroundColor: 'white',
  },
  image:{
    width: width,
    height:250,
  },
  text: {
    color: 'black',
    margin:5
  },
  input: {
    borderRadius: 10,
    width: 350,
    color: 'black',
    borderWidth: 1,
    marginTop:5
  },
  login_box: {
    alignItems: 'center'
  },
  button:{
    marginTop: 5,
  },
    sign_in_button: {
    marginTop:5,
    borderRadius: 10,
  }
});

export default loginStyles;