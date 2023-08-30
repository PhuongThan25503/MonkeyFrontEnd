import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');
export const UserButtonStyle = StyleSheet.create({
  all:{
    backgroundColor: 'white',
  },
  box:{
    flexDirection: 'row',
  },
  text:{
    color: 'black'
  },
  icon:{
    color: 'white',
  },
  button:{
    zIndex:1,
  },
  expandField:{
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 100,
    backgroundColor:'firebrick',
    zIndex: 0,
  },
  fieldName:{
    top: width * 0.14,
  },
  textName:{
    fontSize: width*0.008,
    fontStyle: 'italic',
  },
  expandButton:{
    zIndex:2,
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'red',
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButtonGroup:{
    flexDirection: 'column',
    marginTop: width * 0.16,
    marginLeft: width * 0.12,
  }
});