import { Dimensions, StyleSheet, Animated } from "react-native";

const {width, height} = Dimensions.get('window');

const scaleUp = () => {
  Animated.timing(scaleAnim, {
    toValue:2,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

const scaleDown = () => {
  Animated.timing(scaleAnim, {
    toValue:1,
    duration: 500,
    useNativeDriver: true,
  }).start();
}

export const HomeStyle = StyleSheet.create({
  screen:{
    backgroundColor: 'white',
    height: height,
    flex:1,
  },
  header: {
    flexDirection: 'row',
  },
  authenticate: {
    width: width * 0.1,
    right:0,
  },
  backGround: {
    width: width,
    position:'absolute',
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
    backgroundColor: 'red'
  },
  headerLeft: {
    width: width *0.9,
  }
});