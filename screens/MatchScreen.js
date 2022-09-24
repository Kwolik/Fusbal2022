import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles, { styles2 } from "./MatchScreen.style";
import { TextInput } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import TypeScore from "./TypeScore";

export default function MatchScreen({ route }) {
  const [match, setMatch] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [popup, setPopup] = useState("none");
  const [types, setTypes] = useState();
  const todoRef = firestore.collection("matches").doc(route.params.id);
  const todoRef2 = firestore.collection("users").orderBy("nick");

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
                .update({ type: team1 + ":" + team2, points: 0 });
            } else {
              firestore
                .collection("users")
                .doc(user.uid)
                .collection("types")
                .doc(id)
                .set({ type: team1 + ":" + team2, points: 0 });
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    const updateMachtes = todoRef2.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { name, nick, photo } = doc.data();
        match.push({
          id: doc.id,
          name,
          nick,
          photo,
        });
      });
      setTypes(match);
    });

    return updateMachtes;
  }, []);

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
              {match.club1id &&
              (match.club1id == "en" || match.club1id == "wl") ? (
                <Image
                  source={
                    match.club1id == "en"
                      ? require("../assets/england.png")
                      : require("../assets/wales.png")
                  }
                  style={{ width: 64, height: 40 }}
                />
              ) : (
                <CountryFlag
                  isoCode={match.club1id ? match.club1id : ""}
                  size={40}
                />
              )}
              <View style={styles.viewCountry}>
                <Text style={styles.country}>{match.club1}</Text>
              </View>
            </View>
            <View style={styles.viewScore}>
              <Text style={styles.score}>
                {match.result ? match.result : "-"}
              </Text>
            </View>
            <View style={styles.countryFlag}>
              {match.club2id &&
              (match.club2id == "en" || match.club2id == "wl") ? (
                <Image
                  source={
                    match.club2id == "en"
                      ? require("../assets/england.png")
                      : require("../assets/wales.png")
                  }
                  style={{ width: 64, height: 40 }}
                />
              ) : (
                <CountryFlag
                  isoCode={match.club2id ? match.club2id : ""}
                  size={40}
                />
              )}
              <View style={styles.viewCountry}>
                <Text style={styles.country}>{match.club2}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={types}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TypeScore
              id={item.id}
              name={item.name}
              nick={item.nick}
              photo={item.photo}
              number={index + 1}
              matchid={match.id}
            />
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setPopup("flex")}>
        <Text style={styles.textButton}>Obstaw wynik meczu</Text>
        <Image source={require("../assets/plus.png")} />
      </TouchableOpacity>
      {/* POPUP  */}
      <View style={[styles2.container, { display: popup }]}>
        <View style={styles2.popup}>
          <Text style={styles2.desc}>Obstaw wynik meczu</Text>
          <View style={styles2.meetInfo}>
            <View style={styles2.countryFlag}>
              {match.club1id &&
              (match.club1id == "en" || match.club1id == "wl") ? (
                <Image
                  source={
                    match.club1id == "en"
                      ? require("../assets/england.png")
                      : require("../assets/wales.png")
                  }
                  style={{ width: 64, height: 40 }}
                />
              ) : (
                <CountryFlag
                  isoCode={match.club1id ? match.club1id : ""}
                  size={40}
                />
              )}
              <View style={styles2.viewCountry}>
                <Text style={styles2.country}>{match.club1}</Text>
              </View>
              <TextInput
                mode="outlined"
                placeholder="0"
                keyboardType="numeric"
                value={team1}
                onChangeText={(text) => setTeam1(text)}
                style={styles2.input}
                outlineColor="rgba(0, 0, 0, 0.23)"
              />
            </View>
            <View style={styles2.viewScore}>
              <Text style={styles2.score}>-</Text>
            </View>
            <View style={styles2.countryFlag}>
              {match.club2id &&
              (match.club2id == "en" || match.club2id == "wl") ? (
                <Image
                  source={
                    match.club2id == "en"
                      ? require("../assets/england.png")
                      : require("../assets/wales.png")
                  }
                  style={{ width: 64, height: 40 }}
                />
              ) : (
                <CountryFlag
                  isoCode={match.club2id ? match.club2id : ""}
                  size={40}
                />
              )}
              <View style={styles2.viewCountry}>
                <Text style={styles2.country}>{match.club2}</Text>
              </View>
              <TextInput
                mode="outlined"
                placeholder="0"
                keyboardType="numeric"
                value={team2}
                onChangeText={(text) => setTeam2(text)}
                style={styles2.input}
                outlineColor="rgba(0, 0, 0, 0.23)"
              />
            </View>
          </View>
          <View style={styles2.viewButtons}>
            <TouchableOpacity
              style={styles2.button}
              onPress={() => setPopup("none")}
            >
              <Text style={styles2.close}>ANULUJ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2.button}
              onPress={() => {
                setPopup("none"), typeScore(match.id);
              }}
            >
              <Text style={styles2.add}>DODAJ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>Siema</Text> //zmienic leppiej pozniej na loading
  );
}
