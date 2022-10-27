import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "20%",
    backgroundColor: "#0D4A85",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  positionTextBackground: {
    marginTop: "9%",
    alignItems: "center",
  },
  textBackground: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 25,
    letterSpacing: 0.15,
    color: "#1976D2",
    opacity: 0.3,
  },
  matchInfo: {
    width: "80%",
    height: 120,
    backgroundColor: "#FFFFFF",
    marginTop: -8,
    borderRadius: 8,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  dateAndHour: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    letterSpacing: 0.15,
    color: "rgba(97, 97, 97, 0.9)",
    lineHeight: 14,
  },
  meetInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 28,
    marginRight: 28,
  },
  countryFlag: {
    justifyContent: "center",
    alignItems: "center",
    width: "38%",
  },
  viewScore: {
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    textAlign: "center",
    fontFamily: "Work-Sans-Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2.15,
    color: "#121212",
  },
  viewCountry: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  country: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.15,
    color: "#121212",
    textAlign: "center",
  },
  flatlist: {
    marginTop: 88,
    width: "80%",
    height: "50%",
  },
  button: {
    width: "64%",
    backgroundColor: "#0D4A85",
    height: 40,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  textButton: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.4,
    color: "#FFFFFF",
    marginRight: 12,
  },
});

export const styles2 = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#FFFFFF",
    width: 280,
    height: 246,
    borderRadius: 4,
  },
  desc: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.15,
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: 24,
    marginTop: 16,
  },
  meetInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  countryFlag: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewCountry: {
    height: 42,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
    marginBottom: -4,
  },
  country: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    letterSpacing: 0.15,
    color: "#121212",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 48,
    backgroundColor: "#FFFFFF",
  },
  viewScore: {
    justifyContent: "flex-end",
    bottom: 12,
  },
  score: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2.15,
    color: "#121212",
    height: 24,
    textAlign: "center",
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 12,
  },
  close: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.4,
    color: "rgba(97, 97, 97, 0.9)",
    marginRight: 24,
  },
  add: {
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.4,
    color: "#0D4A85",
    marginRight: 16,
  },
});

export default styles;