import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./OneRowScoreboard.style";
import { Avatar } from "react-native-paper";

export default function OneRowScoreboard(props) {
  return (
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
      <Text style={styles.points}>{props.points} pkt</Text>
    </View>
  );
}
