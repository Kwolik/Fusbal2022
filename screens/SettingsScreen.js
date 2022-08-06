import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db, firestore } from "../components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const SettingsScreen = () => {
  const [id, setId] = useState();
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [photo, setPhoto] = useState("");

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
              setPhoto(doc.data().photo);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      const base = `data:image/jpg;base64,${result.base64}`;
      setPhoto(base);

      firestore
        .collection("users")
        .doc(id)
        .update({
          photo: base,
        }) //Poprawic catch pozniej
        .catch((error) => alert("Zbyt duze zdj zmniejsz je!"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{email}</Text>
      {photo ? (
        <Image
          style={{ width: "40%", height: "20%" }}
          source={{
            uri: photo,
          }}
        />
      ) : (
        <Avatar.Text size={124} label={nameUser.substring(0, 1)} />
      )}
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

      <Button title="Pick an image from camera roll" onPress={pickImage} />
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
