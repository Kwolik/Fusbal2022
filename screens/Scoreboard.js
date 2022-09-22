import { Text, FlatList, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Scoreboard.style";
import { Avatar } from "react-native-paper";
import { firestore } from "../components/firebase";
import OneRowScoreboard from "./OneRowScoreboard";

export default function Scoreboard() {
  const todoRef = firestore.collection("users").orderBy("points");
  const [matches, setMatches] = useState([]);
  const [one, setOne] = useState([]);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { name, nick, photo, points } = doc.data();
        match.push({
          id: doc.id,
          name,
          nick,
          photo,
          points,
        });
      });
      setMatches(match);
    });

    return updateMachtes;
  }, []);

  useEffect(() => {
    if (matches && matches.length > 2) {
      setOne(matches[matches.length - 1]);
      setTwo(matches[matches.length - 2]);
      setThree(matches[matches.length - 3]);

      for (let i = 0; i < 3; i++) {
        matches.pop();
      }
    }
  }, [matches]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking graczy</Text>
      <View style={styles.ranked}>
        <View style={styles.numberTwo}>
          <Text style={styles.number}>2</Text>
          {two.photo ? (
            <Image
              style={styles.avatar2}
              source={{
                uri: two.photo,
              }}
            />
          ) : (
            <Avatar.Text size={64} label={"K"} />
          )}
          <Text style={styles.name}>{two.nick ? two.nick : two.name}</Text>
          <Text style={styles.punctation}>{two.points} pkt</Text>
        </View>
        <View style={styles.numberOne}>
          <Text style={styles.number}>1</Text>
          <Image style={styles.crown} source={require("../assets/crown.png")} />
          {one.photo ? (
            <Image
              style={styles.avatar}
              source={{
                uri: one.photo,
              }}
            />
          ) : (
            <Avatar.Text size={88} label={"K"} />
          )}
          <Text style={styles.name}>{one.nick ? one.nick : one.name}</Text>
          <Text style={styles.punctation}>{one.points} pkt</Text>
        </View>
        <View style={styles.numberThree}>
          <Text style={styles.number}>3</Text>
          {three.photo ? (
            <Image
              style={styles.avatar2}
              source={{
                uri: three.photo,
              }}
            />
          ) : (
            <Avatar.Text size={64} label={"K"} />
          )}
          <Text style={styles.name}>
            {three.nick ? three.nick : three.name}
          </Text>
          <Text style={styles.punctation}>{three.points} pkt</Text>
        </View>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={[...matches].sort((a, b) => (a.points < b.points ? 1 : -1))}
          numColumns={1}
          renderItem={({ item, index }) => (
            <OneRowScoreboard
              name={item.name}
              nick={item.nick}
              photo={item.photo}
              points={item.points}
              number={index+4}
            />
          )}
        />
      </View>
    </View>
  );
}
