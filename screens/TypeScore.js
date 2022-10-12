import { Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./TypeScore.style";
import { Avatar } from "react-native-paper";
import { firestore } from "../components/firebase";
import FragmentLoadingRow from "../components/fragmentLoadingRow";

export default function TypeScore(props) {
  const [data, setData] = useState([]);
  const todoRef = firestore
    .collection("users")
    .doc(props.id)
    .collection("types")
    .doc(props.matchid);

  useEffect(() => {
    todoRef.onSnapshot((snapshot) => {
      setData(snapshot.data());
    });
  }, []);

  return data ? (
    <View style={styles.container}>
      <Text style={styles.position}>#{props.number}</Text>
      {props.photo ? (
        <Image
          style={styles.avatar}
          source={{
            uri: props.photo,
          }}
        />
      ) : (
        <Avatar.Text size={32} label={"K"} />
      )}
      <Text style={styles.name}>{props.nick}</Text>
      <Text style={styles.score}>{data.type}</Text>
      <View
        style={[
          styles.viewPoint,
          data.points == 0
            ? { backgroundColor: "#F79E97" }
            : data.points == 1 || data.points == 2
            ? { backgroundColor: "rgba(255, 167, 38, 0.5)" }
            : { backgroundColor: "#AFDAB2" },
        ]}
      >
        <Text style={styles.point}>{data.points} pkt</Text>
      </View>
    </View>
  ) : (
    <FragmentLoadingRow />
  );
}
