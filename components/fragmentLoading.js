import { View, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect } from "react";

export default function FragmentLoading() {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animated.timing(animation, {
    //   toValue: 1,
    //   duration: 800,
    //   useNativeDriver: false,
    // }).start(() => {
    //   Animated.timing(animation, {
    //     toValue: 0,
    //     duration: 800,
    //     useNativeDriver: false,
    //   }).start(() => setAnimation(new Animated.Value(0)));
    // })

    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(animation, {
        toValue: 2,
        duration: 1200,
        useNativeDriver: false,
      })
    ).start();
  }, [animation]);

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#D9D9D9", "#F3F4F6", "#D9D9D9"], //wczesniej bylo na odwrot
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.box, ...animatedStyle }} />
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={{ ...styles.circle1, ...animatedStyle }} />
        <Animated.View style={{ ...styles.circle, ...animatedStyle }} />
        <Animated.View style={{ ...styles.circle2, ...animatedStyle }} />
      </View>
      <Animated.View style={{ ...styles.box2, ...animatedStyle }} />
      <View style={{ marginTop: 16, width: "80%" }}>
        <Animated.View style={{ ...styles.box3, ...animatedStyle }} />
        <Animated.View style={{ ...styles.box3, ...animatedStyle }} />
        <Animated.View style={{ ...styles.box3, ...animatedStyle }} />
        <Animated.View style={{ ...styles.box3, ...animatedStyle }} />
        <Animated.View style={{ ...styles.box3, ...animatedStyle }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 184,
    height: 24,
    backgroundColor: "#D9D9D9",
  },
  circle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#D9D9D9",
    marginTop: 48,
  },
  circle1: {
    width: 64,
    height: 64,
    borderRadius: 44,
    backgroundColor: "#D9D9D9",
    marginTop: 72,
    marginRight: -16,
  },
  circle2: {
    width: 64,
    height: 64,
    borderRadius: 44,
    backgroundColor: "#D9D9D9",
    marginTop: 72,
    marginLeft: -16,
  },
  box2: {
    width: 184,
    height: 16,
    backgroundColor: "#D9D9D9",
    marginTop: 4,
  },
  box3: {
    height: 48,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: 12,
  },
});
