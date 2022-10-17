import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    height: 48,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  nameFootballer: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: "56%",
    marginLeft: 4,
  },
  players: {
    flexDirection: "row",
    width: "34%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: -8,
  },
});

export default styles;
