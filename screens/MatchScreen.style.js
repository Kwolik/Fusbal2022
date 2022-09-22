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
    fontSize: 29,
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
    width: "34%",
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
});

export default styles;
