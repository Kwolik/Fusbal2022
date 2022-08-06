import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db, firestore } from "../components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SettingsScreen = () => {
  const [id, setId] = useState();
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid);
        const docRef = firestore.collection("users").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setNameUser(doc.data().name);
              setEmail(doc.data().email);
              setNick(doc.data().nick);
              console.log("Document data:", doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    });

    return unsubscribe;
  }, []);

  console.log();

  //Zalezy jak sandra zaprojektuje to albo aktualizowac wszystkie dane 1 przyciskiem (email,id,name,nick) lub do kazdego inny przycisk
  const changeNameUser = () => {
    // setDoc(doc(db, "users", id), {
    //     id: id,
    //     name: nameUser,
    //     nick: "",
    //     email: "",
    //     photo: "",
    // });
    firestore.collection("users").doc(id).update({ name: nameUser });
  };

  const changeNick = () => {
    firestore.collection("users").doc(id).update({ nick: nick });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{email}</Text>
      <TextInput
        placeholder="Name"
        value={nameUser}
        onChangeText={(text) => setNameUser(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={changeNameUser} style={styles.button}>
        <Text style={styles.buttonText}>Change Name</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nick"
        value={nick}
        onChangeText={(text) => setNick(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={changeNick} style={styles.button}>
        <Text style={styles.buttonText}>Change Nick</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    color: "red",
    fontSize: 26,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
