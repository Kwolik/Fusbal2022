import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./RowFootballer.style";
import { firestore } from "../../components/firebase";
import { Avatar } from "react-native-paper";
import FragmentLoadingRow from "../../components/fragmentLoadingRow";

export default function RowFootballer() {
  const [king, setKing] = useState([]);
  const team = [];
  const todoRef = firestore.collection("footballer");

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { name, photo } = doc.data();
        match.push({
          id: doc.id,
          name: name,
          photo: photo,
        });
      });
      setKing(match);
    });

    return updateMachtes;
  }, []);

  king.map((item) => team.indexOf(item.name) == -1 && team.push(item.name));

  return team && team[0] ? (
    team.map((item, index) => (
      <View style={styles.container} key={index}>
        <Text style={styles.nameFootballer}>{item}</Text>
        <View style={styles.players}>
          {king.map(
            (name, index) =>
              item == name.name &&
              (name.photo ? (
                <Image
                  key={index}
                  style={styles.avatar}
                  source={{
                    uri: name.photo,
                  }}
                />
              ) : (
                <Avatar.Text size={32} label={"K"} />
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
