import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { firestore } from "../components/firebase";
import mainContext from "../components/mainContext";
import styles from "./HomeScreen.style";
import Svg, { Path } from "react-native-svg";
import OneRowMatch from "../components/OneRowMatch";

export default function HomeScreen({ navigation }) {
  const { signOutUser } = useContext(mainContext);
  const [users, setUsers] = useState([]);
  const [lastMatches, setLastMatches] = useState([]);
  const [nextMatches, setNextMatches] = useState([]);

  const todoRef = firestore
    .collection("users")
    .orderBy("points")
    .limitToLast(3);

  const todoRef2 = firestore
    .collection("matches")
    .where("id", "<", "221120221400") //zmienic później datę
    .orderBy("id")
    .limitToLast(4);

  const todoRef3 = firestore
    .collection("matches")
    .where("id", ">", "221120221400") //zmienic później datę
    .orderBy("id")
    .limit(4);

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
      setUsers(match);
    });

    return updateMachtes;
  }, []);

  useEffect(() => {
    const updateMachtes = todoRef2.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { club1, club1id, club2, club2id, result, date, hour } =
          doc.data();
        match.push({
          id: doc.id,
          club1,
          club1id,
          club2,
          club2id,
          result,
          date,
          hour,
        });
      });
      setLastMatches(match);
    });

    return updateMachtes;
  }, []);

  useEffect(() => {
    const updateMachtes = todoRef3.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { club1, club1id, club2, club2id, result, date, hour } =
          doc.data();
        match.push({
          id: doc.id,
          club1,
          club1id,
          club2,
          club2id,
          result,
          date,
          hour,
        });
      });
      setNextMatches(match);
    });

    return updateMachtes;
  }, []);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={288}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: 0 }}
      >
        <Path d="M43 131L0 0H420V300L340 189H138L43 131Z" fill="#F3F6F9" />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={() => signOutUser()}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.text}>
          <Text style={styles.title}>Ranking</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Ranking")}>
            <Text style={styles.all}>Zobacz cały {"->"}</Text>
          </TouchableOpacity>
        </View>
        {users[0] ? (
          <View style={styles.ranked}>
            <View style={styles.numberTwo}>
              <Text style={styles.number}>2</Text>
              {users[1].photo ? (
                <Image
                  style={styles.avatar2}
                  source={{
                    uri: users[1].photo,
                  }}
                />
              ) : (
                <Avatar.Text size={64} label={"K"} />
              )}
              <Text style={styles.name}>
                {users[1].nick ? users[1].nick : users[1].name}
              </Text>
              <Text style={styles.punctation}>{users[1].points} pkt</Text>
            </View>
            <View style={styles.numberOne}>
              <Text style={styles.number}>1</Text>
              <Image
                style={styles.crown}
                source={require("../assets/crown.png")}
              />
              {users[2].photo ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: users[2].photo,
                  }}
                />
              ) : (
                <Avatar.Text size={88} label={"K"} />
              )}
              <Text style={styles.name}>
                {users[2].nick ? users[2].nick : users[2].name}
              </Text>
              <Text style={styles.punctation}>{users[2].points} pkt</Text>
            </View>
            <View style={styles.numberThree}>
              <Text style={styles.number}>3</Text>
              {users[0].photo ? (
                <Image
                  style={styles.avatar2}
                  source={{
                    uri: users[0].photo,
                  }}
                />
              ) : (
                <Avatar.Text size={64} label={"K"} />
              )}
              <Text style={styles.name}>
                {users[0].nick ? users[0].nick : users[0].name}
              </Text>
              <Text style={styles.punctation}>{users[0].points} pkt</Text>
            </View>
          </View>
        ) : (
          <Text>lol</Text>
        )}
        <View>
          <Text style={styles.title}>Następne mecze</Text>
          <View style={styles.flatlist}>
            {lastMatches.map((item, index) => (
              <OneRowMatch
                key={index}
                id={item.id}
                club1={item.club1}
                club1id={item.club1id}
                club2={item.club2}
                club2id={item.club2id}
                date={item.date}
                hour={item.hour}
                result={item.result}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Poprzednie mecze</Text>
          <View style={styles.flatlist}>
            {nextMatches.map((item, index) => (
              <OneRowMatch
                key={index}
                id={item.id}
                club1={item.club1}
                club1id={item.club1id}
                club2={item.club2}
                club2id={item.club2id}
                date={item.date}
                hour={item.hour}
                result={item.result}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
