import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    letterSpacing: 0.17,
    fontSize: 14,
    color: "#121212",
  },
  progres: {
    width: 240,
    height: 6,
  },
  textProgres: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: 0.17,
    fontSize: 14,
    color: "#FFA726",
  },
  all: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: 0.17,
    fontSize: 10,
    color: "rgba(97, 97, 97, 0.9)",
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
    color: "#121212",
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
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;
