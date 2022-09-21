import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
  country: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: "22%",
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
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 8,
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
});

export default styles;
