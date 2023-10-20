import { Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get('window');

export const HomeStyle = StyleSheet.create({
  screen:{
    backgroundColor: 'white',
    height: height,
    flex:1,
    flexDirection:'column'
  },
  header: {
    flexDirection: 'row',
    height: '1%',
  },
  authenticate: {
    width: width * 0.1,
    right:0,
  },
  backGroundBound:{
    height:'45%'
  },
  backGround: {
    width: width,
    position:'absolute',
    zIndex:1
  },
  loginButton: {
    right:0,
    height: width * 0.12,
    width: width * 0.12,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    margin: width * 0.015,
    position: 'absolute',
    backgroundColor: 'red',
    zIndex:2,
  },
  headerLeft: {
    width: width *0.9,
  },
  functionButtonField: {
    margin: width * 0.1,
    justifyContent:'center',
    flexDirection:'row',
    width: width * 0.8,
    flex:1,
    flexWrap:'wrap'
  },
  functionalButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    width: width * 0.3,
    height: width * 0.3,
    margin: width * 0.02,
  },
});