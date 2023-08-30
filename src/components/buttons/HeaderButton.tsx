import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { UserButtonStyle } from "./styles/UserButtonStyle";

type Props = {
  title: string,
  Icon: JSX.Element,
  onPressProp: () => void,
}

function HeaderButton({title, Icon, onPressProp }:Props) {
  return (
    <View style={UserButtonStyle.buttonField}>
      <Text style={UserButtonStyle.buttonTitle}>{title}</Text>
      <TouchableOpacity onPress={() => onPressProp()} style={UserButtonStyle.expandButton}>
        <View> 
          {Icon}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HeaderButton;