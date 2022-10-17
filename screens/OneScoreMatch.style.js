import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  match: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  clubLeft: {
    width: "36%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 2,
  },
  clubRight: {
    width: "36%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 2,
  },
  country: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    letterSpacing: 0.17,
    color: "rgba(0, 0, 0, 0.87)",
    width: "70%",
  },
  countryRight: {
    textAlign: "right",
    marginRight: 4,
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
    width: "10%",
    color: "#121212",
    textAlign: "center",
    padding: 2,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
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
  viewPoint: {
    width: 44,
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
