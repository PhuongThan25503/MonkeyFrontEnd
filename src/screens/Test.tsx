import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Svg, Path } from "react-native-svg";

const path3 = [
  "{694,465}",
  "{680,471}",
  "{674,471}",
  "{673,467}",
  "{677,462}",
  "{683,458}",
  "{712,444}",
  "{735,435}",
  "{744,425}",
  "{753,419}",
  "{765,415}",
  "{770,418}",
  "{774,422}",
  "{775,426}",
  "{770,432}",
  "{755,439}",
  "{745,439}",
  "{740,440}",
  "{695,463}"
];

// Convert the array of strings to a single string with M and L commands
const d = path3.reduce((acc, curr, index) => {
  // Remove the curly braces and split by comma
  const [x, y] = curr.replace(/[{}]/g, "").split(",");
  // If it is the first point, use M command
  if (index === 0) {
    return `M${x}.${y}`;
  }
  // Otherwise use L command
  return `${acc}l${x}.${y}`;
}, "");

export default function Test() {
  console.log(d);
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Svg height="300" width="300" viewBox="0 0 512 512">
          <Path
            fill="yellow"
            d="M256.001,0.001l-68.378,220.956H0.001l175.472,127.411L107.093,511.999l148.908-108.631l148.907,108.631
        l-68.379-163.631l175.472-127.411h-187.622L256.001,0.001z"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});