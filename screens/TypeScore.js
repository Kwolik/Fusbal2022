import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore, db } from "../components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function TypeScore() {
  const [matches, setMatches] = useState([]);
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();

  const todoRef = firestore.collection("matches");

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { club1, club2, type } = doc.data();
        match.push({
          id: doc.id,
          club1,
          club2,
          type,
        });
      });
      setMatches(match);
    });

    return updateMachtes;
  }, []);

  const typeScore = (id) => {
    if (team1 !== null && team2 !== null) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          getDoc(doc(db, "types", user.uid)).then((docSnap) => {
            if (docSnap.exists()) {
              firestore
                .collection("users")
                .doc(user.uid)
                .collection("types")
                .doc(id)
                .update({ type: team1 + ":" + team2 });
            } else {
              firestore
                .collection("users")
                .doc(user.uid)
                .collection("types")
                .doc(id)
                .set({ type: team1 + ":" + team2 });
            }
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, borderWidth: 2, borderColor: "red" }}
        data={matches}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.club1} - {item.club2}
            </Text>
            <View style={styles.type}>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                value={team1}
                onChangeText={(text) => setTeam1(text)}
                style={styles.input}
              ></TextInput>
              <Text> : </Text>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                value={team2}
                onChangeText={(text) => setTeam2(text)}
                style={styles.input}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => typeScore(item.id)}
            >
              <Text>Obstaw</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  type: {
    backgroundColor: "gray",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: "25%",
  },
});
