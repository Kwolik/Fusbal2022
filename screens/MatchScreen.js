import { StyleSheet, Text, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firestore } from "../components/firebase";

export default function MatchScreen() {
  const [matches, setMatches] = useState([]);
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
        console.log(club1);
      });
      setMatches(match);
    });

    return updateMachtes;
  }, []);

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
            <Text>{item.type}</Text>
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
});
