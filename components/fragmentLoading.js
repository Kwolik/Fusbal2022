import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

//Dopracować później fragment loading
export default function FragmentLoading() {
  return (
    <View style={styles.container}>
      <Text>Dodac pozniej zdj apki</Text>
      <ActivityIndicator
        style={{
          position: "absolute",
          left: "50%",
          right: "50%",
          top: "50%",
          bottom: "50%",
        }}
        color={"#F39B36"}
        size={100}
        opacity={1.0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#00bcd4",
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
});
