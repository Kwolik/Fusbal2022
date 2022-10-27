import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  match: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clubLeft: {
    width: "38%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 2,
  },
  clubRight: {
    width: "38%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2,
  },
  country: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: "67%",
  },
  countryRight: {
    textAlign: "right",
    marginRight: 4,
    marginLeft: 16,
  },
  countryLeft: {
    textAlign: "left",
    marginLeft: 4,
  },
  result: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.17,
    color: "#121212",
    textAlign: "center",
    width: "10%",
    padding: 2,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    marginLeft: 4,
  },
  date: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    letterSpacing: 0.15,
    color: "rgba(97, 97, 97, 0.9)",
  },
  hour: {
    fontFamily: "Work-Sans-Bold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.15,
    color: "rgba(97, 97, 97, 0.9)",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    borderWidth: 0.01,
  },
});

export default styles;
