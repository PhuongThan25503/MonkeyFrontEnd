import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { FunctionalButtonStyle } from "./styles/FunctionalButtonStyle";
import { Text } from "react-native";

type Props = {
  title: string,
  Icon: JSX.Element,
  onPressProp: () => void,
  styleProp: ViewStyle,
}

function FunctionalButton({title, Icon, styleProp, onPressProp}: Props){
  return(
    <TouchableOpacity onPress={()=>onPressProp()}>
      <View style={StyleSheet.compose(FunctionalButtonStyle.buttonBound, styleProp)}>
        {Icon}
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FunctionalButton;