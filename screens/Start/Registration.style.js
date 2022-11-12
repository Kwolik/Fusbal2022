import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  photo: {
    width: "100%",
    height: "58%",
    //flex: 1
  },
  viewText: {
    marginTop: 80,
    marginLeft: 70,
    marginRight: 70,
    display: "flex",
  },
  text: {
    fontSize: 21,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "700",
    alignItems: "center",
    letterSpacing: 0.15,
    color: "#0D4A85",
    lineHeight: 32,
  },
  inputContainer: {
    marginTop: "11%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "54%",
    height: 56,
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: "3.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D4A85",
    borderRadius: 4,
    width: "54%",
    height: 42,
    //shadow button
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    letterSpacing: 0.46,
  },
  buttonFacebook: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1877F2",
    borderRadius: 4,
    width: "54%",
    height: 42,
    marginTop: "16%",
    flexDirection: "row",
  },
  logo: {
    width: 23,
    marginRight: 16,
  },
  buttonFacebookText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
  },
  buttonGoogle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    width: "54%",
    height: 42,
    marginTop: "8%",
    flexDirection: "row",
    //Shadow przycisku
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: "10%",
  },
  buttonGoogleText: {
    color: "rgba(0, 0, 0, 0.54)",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
  },
  info: {
    fontWeight: "500",
    fontSize: 13,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    color: "#0D4A85",
    letterSpacing: 0.17,
  },
  snackbar: {
    backgroundColor: "#0D4A85",
  },
});

export default styles;
