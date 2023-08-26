import { StyleSheet, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const loginStyles = StyleSheet.create({
  all:{
    backgroundColor: 'white',
    height: height,
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
    alignItems: 'center',
  },
  button_field:{
    marginTop: 5,
  },
  sign_in_button: {
    marginTop:5,
  },
  separate_field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  separate_line: {
    width: 100,
    backgroundColor: 'black',
    opacity: 0.2,
    height: 1,
  },
  third_party_login_button: {
    marginTop: 20,
  }
});

export default loginStyles;