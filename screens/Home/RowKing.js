import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./RowKing.style";
import { firestore } from "../../components/firebase";
import CountryFlag from "react-native-country-flag";
import { Avatar } from "react-native-paper";
import FragmentLoadingRow from "../../components/fragmentLoadingRow";
import { TeamList } from "../../components/TeamList";

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

  king.map((item) => team.indexOf(item.team) == -1 && team.push(item.team));

  return team && team[0] ? (
    team.map((item, index) => (
      <View style={styles.container} key={index}>
        <View style={styles.country}>
          {item == "Anglia" ? (
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
              {TeamList.map(
                (team, index) =>
                  item == team.value && (
                    <CountryFlag isoCode={team.code} size={20} key={index} />
                  )
              )}
            </View>
          )}
          <Text style={styles.nameCountry}>{item}</Text>
        </View>
        <View style={styles.players}>
          {king.map(
            (name, index) =>
              item == name.team &&
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
