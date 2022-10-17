import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: "35%", //bylo 45%
  },
  score: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    marginRight: "15%",
  },
  viewPoint: {
    width: 41,
    height: 16,
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10.5,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
  },
});

export default styles;
