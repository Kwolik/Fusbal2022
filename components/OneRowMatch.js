import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./OneRowMatch.style";
import CountryFlag from "react-native-country-flag";

export default function OneRowMatch(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("MatchScreen", { id: props.id })}
    >
      <View style={styles.container}>
        <View style={styles.match}>
          <Text style={[styles.country, styles.countryRight]}>
            {props.club1}
          </Text>
          <CountryFlag
            isoCode={props.club1id ? props.club1id : ""}
            size={20}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.result}>{props.result ? props.result : "-"}</Text>
          <CountryFlag
            isoCode={props.club2id ? props.club2id : ""}
            size={20}
            style={{ marginLeft: 4 }}
          />
          <Text style={[styles.country, styles.countryLeft]}>
            {props.club2}
          </Text>
          <View style={styles.info}>
            <Text style={styles.date}>{props.date}</Text>
            <Text style={styles.hour}>{props.hour}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
