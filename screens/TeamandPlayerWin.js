import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../components/firebase";

export default function TeamandPlayerWin() {
  const [id, setId] = useState();
  const [footballer, setFootballer] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid);
        const docRef = firestore.collection("footballer").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setFootballer(doc.data().name);
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

  const typeFootballer = () => {
    if (footballer && id) {
      const docRef = firestore.collection("footballer").doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({ name: footballer });
          } else {
            docRef.set({ name: footballer });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };

  //Podobno zrobić zwyciestwe mistrzostw lub wypisac wszystkie drużyny i mozliwosc opcji zaznaczenia 1

  return (
    <View style={styles.container}>
      <Text>Type the best player</Text>
      <TextInput
        placeholder="Robert Lewandowski"
        value={footballer}
        onChangeText={(text) => setFootballer(text)}
        style={styles.input}
      ></TextInput>
      <TouchableOpacity onPress={typeFootballer}>
        <Text>Obstaw Piłkarza</Text>
      </TouchableOpacity>
      <View>
        <Text>Team Win</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: "60%",
  },
});
