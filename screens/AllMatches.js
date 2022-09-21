import { View, Text, ImageBackground, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./AllMatches.style";
import photo from "../assets/backgroundhome.png";
import { firestore } from "../components/firebase";
import OneRowMatch from "../components/OneRowMatch";

export default function AllMatches({ navigation }) {
  const [matches, setMatches] = useState([]);
  const todoRef = firestore.collection("matches");

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { club1, club1id, club2, club2id, result, date, hour } =
          doc.data();
        match.push({
          id: doc.id,
          club1,
          club1id,
          club2,
          club2id,
          result,
          date,
          hour,
        });
      });
      setMatches(match);
    });

    return updateMachtes;
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={photo} style={styles.photo}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Wszystkie mecze</Text>
          <View style={styles.flatlist}>
            <FlatList
              data={matches}
              numColumns={1}
              renderItem={({ item }) => (
                <OneRowMatch
                  id={item.id}
                  club1={item.club1}
                  club1id={item.club1id}
                  club2={item.club2}
                  club2id={item.club2id}
                  date={item.date}
                  hour={item.hour}
                  result={item.result}
                  navigation={navigation}
                />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
