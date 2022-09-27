import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./OneRowMatch.style";
import CountryFlag from "react-native-country-flag";

export default function OneRowMatch(props) {
  var date = new Date().toTimeString();

  return (
    props.club1 != "-" &&
    props.club2 != "-" && (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("MatchScreen", { id: props.id })
        }
      >
        <View style={styles.container}>
          <View style={styles.match}>
            <Text style={[styles.country, styles.countryRight]}>
              {props.club1}
            </Text>
            {props.club1id &&
            (props.club1id == "en" || props.club1id == "wl") ? (
              <Image
                source={
                  props.club1id == "en"
                    ? require("../assets/england.png")
                    : require("../assets/wales.png")
                }
                style={{ width: 32, height: 24, marginRight: 4 }}
              />
            ) : (
              <CountryFlag
                isoCode={props.club1id ? props.club1id : ""}
                size={20}
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={styles.result}>
              {props.result ? props.result : "-"}
            </Text>
            {props.club2id &&
            (props.club2id == "en" || props.club2id == "wl") ? (
              <Image
                source={
                  props.club2id == "en"
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
                isoCode={props.club2id ? props.club2id : ""}
                size={20}
                style={{
                  marginRight: 4,
                }}
              />
            )}
            <Text style={[styles.country, styles.countryLeft]}>
              {props.club2}
            </Text>
            <View style={styles.info}>
              <Text style={styles.date}>{props.date}</Text>
              <Text style={styles.hour}>
                {date.substring(19, 22) == "GMT"
                  ? props.hour.replace(
                      props.hour.substring(0, 2),
                      props.hour.substring(0, 2) - 1
                    )
                  : props.hour}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
}
