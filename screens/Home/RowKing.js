import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./RowKing.style";
import { firestore } from "../../components/firebase";
import CountryFlag from "react-native-country-flag";
import { Avatar } from "react-native-paper";
import FragmentLoadingRow from "../../components/fragmentLoadingRow";

export default function RowKing() {
  const [king, setKing] = useState([]);
  const team = [];
  const todoRef = firestore.collection("king");

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { team, photo, code } = doc.data();
        match.push({
          id: doc.id,
          team: team,
          photo: photo,
          code: code,
        });
      });
      setKing(match);
    });

    return updateMachtes;
  }, []);

  king.map((item) => team.indexOf(item.team) == -1 && team.push(item));

  return team && team[0] ? (
    team.map((item, index) => (
      <View style={styles.container} key={index}>
        <View style={styles.country}>
          {item.code == "en" || item.code == "wl" ? (
            <View style={styles.shadow}>
              <Image
                source={
                  true
                    ? require("../../assets/england.png")
                    : require("../../assets/wales.png")
                }
                style={{ width: 32, height: 24, marginRight: 4 }}
              />
            </View>
          ) : (
            <View style={styles.shadow}>
              <CountryFlag isoCode={item.code} size={20} />
            </View>
          )}
          <Text style={styles.nameCountry}>{item.team}</Text>
        </View>
        <View style={styles.players}>
          {king.map(
            (name, index) =>
              item.team == name.team &&
              (name.photo ? (
                <Image
                  key={index}
                  style={styles.avatar}
                  source={{
                    uri: name.photo,
                  }}
                />
              ) : (
                <Avatar.Text
                  key={index}
                  size={32}
                  label={"K"}
                  style={{ marginLeft: -8 }}
                />
              ))
          )}
        </View>
      </View>
    ))
  ) : (
    <View>
      <FragmentLoadingRow />
      <FragmentLoadingRow />
      <FragmentLoadingRow />
    </View>
  );
}
