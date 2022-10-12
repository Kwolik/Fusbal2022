import { View, StyleSheet, Animated } from "react-native";
import React, { useState } from "react";

//Nie działa nie wiedzieć czemu
export default function FragmentLoadingRow() {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  Animated.timing(animation, {
    toValue: 1,
    duration: 800,
    useNativeDriver: false,
  }).start(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start(() => setAnimation(new Animated.Value(0)));
  });

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D9D9D9", "#F3F4F6"],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  return (
    <View style={{ width: "100%" }}>
      <Animated.View style={{ ...styles.box, ...animatedStyle }} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 48,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: 12,
  },
});
