import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Login.styles";
import { auth } from "../components/firebase.js";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import FragmentLoading from "../components/fragmentLoading.js";
import photo from "../assets/backgroundlogin.png";
import { TextInput } from "react-native-paper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "594410513964-dud3rqgv8sbak5rpcdd0lvcve9ci54u3.apps.googleusercontent.com",
  });

  const [request1, response1, promptAsync1] = Facebook.useAuthRequest({
    clientId: "5113450932086183",
  });

  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => {
        alert(error.message), setLoading(false);
      });
  };

  useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }

    if (response1?.type === "success") {
      setLoading(true);
      const auth = getAuth();
      const credential = FacebookAuthProvider.credential(
        response1.authentication.accessToken
      );
      signInWithCredential(auth, credential);
    }
  }, [response, response1]);

  return (
    <View style={styles.container}>
      <ImageBackground source={photo} style={styles.photo}>
        {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}
        <View style={styles.viewText}>
          <Text style={styles.text}>Witaj ponownie!</Text>
          <Text style={styles.text}>Zaloguj się</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Adres e-mail"
            placeholder="twojadres@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            outlineColor="rgba(0, 0, 0, 0.23)"
          />
          <TextInput
            mode="outlined"
            label="Hasło"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={visibility}
            right={
              <TextInput.Icon
                icon={visibility ? "eye" : "eye-off"}
                style={{ top: 4 }}
                onPress={() => {
                  setVisibility(!visibility);
                }}
              />
            }
            outlineColor="rgba(0, 0, 0, 0.23)"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Zaloguj się</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => promptAsync1()}
            style={[styles.buttonFacebook]}
          >
            <Image
              source={require("../assets/facebooklogo.png")}
              style={styles.logo}
            />
            <Text style={styles.buttonFacebookText}>Zaloguj z Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => promptAsync()}
            style={styles.buttonGoogle}
          >
            <Image
              source={require("../assets/googlelogo.png")}
              style={styles.logo}
            />
            <Text style={styles.buttonGoogleText}>Zaloguj z Google</Text>
          </TouchableOpacity>
        </View>
        {loading && <FragmentLoading />}
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </View>
  );
}
