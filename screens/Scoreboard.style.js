import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginTop: 64,
    color: "#FFFFFF",
  },
  ranked: {
    flexDirection: "row",
    marginTop: 12,
  },
  numberOne: {
    alignItems: "center",
  },
  numberTwo: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: -8,
  },
  numberThree: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: -12,
  },
  number: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    letterSpacing: 0.17,
    color: "#FFFFFF",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatar2: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: 64,
    textAlign: "center",
  },
  punctation: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
  },
  flatlist: {
    width: "80%",
    height: "54%",
    marginTop: 20,
  },
});

export default styles;
