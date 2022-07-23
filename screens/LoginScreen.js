import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { useNavigation } from "@react-navigation/core";
import * as GoogleSignIn from "expo-google-sign-in";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Register in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    initAsync();
  });
  const androidClientId =
    "594410513964-teibopsk70st5fmnsje2embcm2ogu5uq.apps.googleusercontent.com";
  const iosClientId =
    "594410513964-jh33b0j7u95rctu9cm0nfrsi6asad1uo.apps.googleusercontent.com";

  const initAsync = () => {
    try {
      GoogleSignIn.initAsync({
        clientId: Platform.OS === "android" ? androidClientId : iosClientId,
      });
    } catch ({ message }) {
      console.log("Error: ", message);
    }
  };

  const handleGoogleSignIn = () => {
    try{
        const{type, user} = GoogleSignIn.GoogleSignIn
        if(type == 'success')
        {
            console.log('User ', user)
        }
    }catch {}
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutLineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutLineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
