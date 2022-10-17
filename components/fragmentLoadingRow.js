import { View, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect } from "react";

export default function FragmentLoadingRow() {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(animation, {
        toValue: 2,
        duration: 1800,
        useNativeDriver: false,
      })
    ).start();
  }, [animation]);

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#D9D9D9", "#F3F4F6", "#D9D9D9"],
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
