import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  position: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: 28,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  name: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: "45%",
  },
  points: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    marginRight: 28,
  },
});

export default styles;
