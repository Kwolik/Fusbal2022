import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore, db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles, { styles2 } from "./MatchScreen.style";
import { TextInput } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import TypeScore from "./TypeScore";
import FragmentLoading from "../../components/fragmentLoading";

export default function MatchScreen({ route }) {
  const [match, setMatch] = useState();
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [types, setTypes] = useState();
  const [visible, setVisible] = useState(false);
  const todoRef = firestore.collection("matches").doc(route.params.id);
  const todoRef2 = firestore.collection("users").orderBy("nick");
  var date = new Date().toTimeString();
  var day = new Date().getDate(); //Current Date
  if (day < 10) day = "0" + day;
  var month = new Date().getMonth() + 1; //Current Month
  var hours = new Date().getHours(); //Current Hours
  if (hours < 10) hours = "0" + hours;
  var min = new Date().getMinutes(); //Current Minutes

  useEffect(() => {
    todoRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTimeout(() => setMatch(doc.data()), 1500);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  //Zabezpieczyc ta funckje tak zeby sprawdzal najpierw jaka jest godzina a potem dopeiro aktualizowal wynik
  const typeScore = (id) => {
    if (
      month + "." + day <
        match.date.substring(3, 5) + "." + match.date.substring(0, 2) ||
      (month + "." + day ==
        match.date.substring(3, 5) + "." + match.date.substring(0, 2) &&
        hours + ":" + min <=
          (date.substring(19, 22) == "GMT"
            ? match.hour.replace(
                match.hour.substring(0, 2),
                match.hour.substring(0, 2) - 1
              )
            : match.hour))
    ) {
      if (team1 !== "" && team2 !== "") {
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
    } else console.log("po czasie");
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
              {match.date}{" "}
              {date.substring(19, 22) == "GMT"
                ? match.hour.replace(
                    match.hour.substring(0, 2),
                    match.hour.substring(0, 2) - 1
                  )
                : match.hour}
            </Text>
          </View>
          <View style={styles.meetInfo}>
            <View style={styles.countryFlag}>
              {match.club1id &&
              (match.club1id == "en" || match.club1id == "wl") ? (
                <Image
                  source={
                    match.club1id == "en"
                      ? require("../../assets/england.png")
                      : require("../../assets/wales.png")
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
                      ? require("../../assets/england.png")
                      : require("../../assets/wales.png")
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
      {month + "." + day <
        match.date.substring(3, 5) + "." + match.date.substring(0, 2) ||
      (month + "." + day ==
        match.date.substring(3, 5) + "." + match.date.substring(0, 2) &&
        hours + ":" + min <=
          (date.substring(19, 22) == "GMT"
            ? match.hour.replace(
                match.hour.substring(0, 2),
                match.hour.substring(0, 2) - 1
              )
            : match.hour)) ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.textButton}>Obstaw wynik meczu</Text>
          <Image source={require("../../assets/plus.png")} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      {/* POPUP  */}
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles2.container}>
          <View style={styles2.popup}>
            <Text style={styles2.desc}>Obstaw wynik meczu</Text>
            <View style={styles2.meetInfo}>
              <View style={styles2.countryFlag}>
                {match.club1id &&
                (match.club1id == "en" || match.club1id == "wl") ? (
                  <Image
                    source={
                      match.club1id == "en"
                        ? require("../../assets/england.png")
                        : require("../../assets/wales.png")
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
                        ? require("../../assets/england.png")
                        : require("../../assets/wales.png")
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
                onPress={() => setVisible(false)}
              >
                <Text style={styles2.close}>ANULUJ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles2.button}
                onPress={() => {
                  setVisible(false), typeScore(match.id);
                }}
              >
                <Text style={styles2.add}>DODAJ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <FragmentLoading />
  );
}