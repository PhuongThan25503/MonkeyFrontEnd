import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');

export const UserStyle = StyleSheet.create({
  screen:{
    flex:1,
    height: height,
  },
  avatarBound: {
    alignItems:'center',
    marginTop: '10%',
  },
  fakeAvatar: {
    alignItems:'center',
    flexDirection:'column',
    justifyContent: 'center',
    width: '35%',
    height: width * 0.35,
    backgroundColor: '#52e2ff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    color: 'black',
  },
  textAvatar:{
    color: 'white',
    fontSize: width * 0.20,
  },
  textName:{
    color: 'black',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  infoBound:{
    alignContent:'flex-start',
    alignItems: "center",
  },
  infoField:{
    flexDirection: 'row',
    margin: 5,
  },
  nameField:{
    margin: width * 0.05,
  },
  subOuterBound:{
    width: width,
  },
  fieldTitle:{
    color: 'black',
    fontWeight: 'bold',
  }
})