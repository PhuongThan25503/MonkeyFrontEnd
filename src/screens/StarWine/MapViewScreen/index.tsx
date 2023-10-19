import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SimpleMarker } from "../ultis/getDataHelper";

type Props = {
  listOfMarker: SimpleMarker[]
}

export default function MapViewScreen({ listOfMarker }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {listOfMarker.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{latitude: marker.lat, longitude: marker.lng}}
            title={"Wine"}
            description={"Here are one thing"}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});