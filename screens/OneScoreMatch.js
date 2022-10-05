import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./OneScoreMatch.style";
import CountryFlag from "react-native-country-flag";
import { firestore } from "../components/firebase";

export default function OneScoreMatch(props) {
  var date = new Date().toTimeString();

  const [match, setMatch] = useState();

  useEffect(() => {
    const docRef = firestore.collection("matches").doc(props.id);

    docRef
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
  }, [firestore.collection("matches").doc(props.id)]);

  return match ? (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("MatchScreen", { id: props.id })}
    >
      <View style={styles.container}>
        <View style={styles.match}>
          <Text style={[styles.country, styles.countryRight]}>
            {match.club1}
          </Text>
          {match.club1id && (match.club1id == "en" || match.club1id == "wl") ? (
            <Image
              source={
                match.club1id == "en"
                  ? require("../assets/england.png")
                  : require("../assets/wales.png")
              }
              style={{ width: 32, height: 24, marginRight: 4 }}
            />
          ) : (
            <CountryFlag
              isoCode={match.club1id ? match.club1id : ""}
              size={20}
              style={{ marginRight: 4 }}
            />
          )}
          <Text style={styles.result}>{match.result ? match.result : "-"}</Text>
          {match.club2id && (match.club2id == "en" || match.club2id == "wl") ? (
            <Image
              source={
                match.club2id == "en"
                  ? require("../assets/england.png")
                  : require("../assets/wales.png")
              }
              style={{
                width: 32,
                height: 22,
                marginRight: 4,
              }}
            />
          ) : (
            <CountryFlag
              isoCode={match.club2id ? match.club2id : ""}
              size={20}
              style={{
                marginRight: 4,
              }}
            />
          )}
          <Text style={[styles.country, styles.countryLeft]}>
            {match.club2}
          </Text>
          <View style={styles.info}>
            <Text style={styles.date}>{match.date}</Text>
            <Text style={styles.hour}>
              {date.substring(19, 22) == "GMT"
                ? match.hour.replace(
                    match.hour.substring(0, 2),
                    match.hour.substring(0, 2) - 1
                  )
                : match.hour}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.viewPoint,
            props.points == 0
              ? { backgroundColor: "#F79E97" }
              : props.points == 1 || props.points == 2
              ? { backgroundColor: "rgba(255, 167, 38, 0.5)" }
              : { backgroundColor: "#AFDAB2" },
          ]}
        >
          <Text style={styles.point}>{props.points} pkt</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View></View>
  );
}
