import { StyleSheet, Text, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firestore } from "../components/firebase";
import styles from "./MatchScreen.style";
import CountryFlag from "react-native-country-flag";

export default function MatchScreen({ route }) {
  const [match, setMatch] = useState();
  const todoRef = firestore.collection("matches").doc(route.params.id);

  useEffect(() => {
    todoRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMatch(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  console.log(route.params.id);

  return match ? (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.positionTextBackground}>
          <Text style={styles.textBackground}>
            {match.club1} - {match.club2}
          </Text>
        </View>
        <View style={styles.matchInfo}>
          <View style={styles.info}>
            <Text style={styles.dateAndHour}>
              {match.date} {match.hour}
            </Text>
          </View>
          <View style={styles.meetInfo}>
            <View style={styles.countryFlag}>
              <CountryFlag
                isoCode={match.club1id ? match.club1id : ""}
                size={40}
              />
              <Text style={styles.country}>{match.club1}</Text>
            </View>
            <View style={styles.viewScore}>
              <Text style={styles.score}>
                {match.result ? match.result : "-"}
              </Text>
            </View>
            <View style={styles.countryFlag}>
              <CountryFlag
                isoCode={match.club2id ? match.club2id : ""}
                size={40}
              />
              <Text style={styles.country}>{match.club2}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>Siema</Text> //zmienic leppiej pozniej na loading
  );
}
