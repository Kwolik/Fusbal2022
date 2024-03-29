import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, ProgressBar } from "react-native-paper";
import { firestore } from "../../components/firebase";
import styles from "./HomeScreen.style";
import Svg, { Path } from "react-native-svg";
import OneRowMatch from "../../components/OneRowMatch";
import RowKing from "./RowKing";
import RowFootballer from "./RowFootballer";
import FragmentLoading from "../../components/fragmentLoading";

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [lastMatches, setLastMatches] = useState([]);
  const [nextMatches, setNextMatches] = useState([]);
  const [playMatches, setPlayMacthes] = useState(0);

  var day = new Date().getDate(); //Current Date
  if (day < 10) day = "0" + day;
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year

  const todoRef = firestore
    .collection("users")
    .orderBy("points")
    .limitToLast(3);

  const todoRef2 = firestore
    .collection("matches")
    .where(
      "id",
      "<",
      ("" + month == 12) && "id",
      "<",
      "" + year == 2023
        ? day
            .toString()
            .replace(day.toString().substring(0, 2), 30 + new Date().getDate())
        : day + "" + month + "" + year + "0000"
    )
    .orderBy("id")
    .limitToLast(4);

  const todoRef3 = firestore
    .collection("matches")
    .where(
      "id",
      ">",
      "" + month == 12 && "id",
      "<",
      "" + year == 2023
        ? day
            .toString()
            .replace(day.toString().substring(0, 2), 30 + new Date().getDate())
        : day + "" + month + "" + year + "0000"
    )
    .orderBy("id")
    .limit(4);

  const todoRef4 = firestore.collection("matches");

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

  useEffect(() => {
    const updateMachtes = todoRef4.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { result } = doc.data();
        if (result != "") {
          setPlayMacthes((prevstate) => prevstate + 1);
        }
      });
    });

    return updateMachtes;
  }, []);

  // var date = new Date().toTimeString();
  // var strefa = new Date().toLocaleTimeString();
  // var utc = new Date().toUTCString();
  // console.log(utc);
  // wczesniejsze svg M43 131L0 0H420V300L340 189H138L43 131Z

  return users && users[0] ? (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#0D4A85"
        color="black"
        barStyle="light-content"
      />
      <Svg
        width="100%"
        height={288}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: 0 }}
      >
        <Path d="M43 111L0 0H420V290L301 160H160L43 111Z" fill="#F3F6F9" />
      </Svg>
      <ScrollView>
        <View style={styles.info}>
          <TouchableOpacity>
            <Image source={require("../../assets/info.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.elements}>
          <Text style={styles.title}>Rozegrane mecze</Text>
          <View style={styles.text}>
            <ProgressBar
              progress={playMatches / 64}
              color="#FFA726"
              style={styles.progres}
            />
            <Text style={styles.textProgres}>
              {((playMatches / 64) * 100).toFixed(0) + "%"}
            </Text>
          </View>
          <View style={[styles.text, { marginTop: 64 }]}>
            <Text style={styles.title}>Ranking</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Ranking")}>
              <Text style={styles.all}>Zobacz cały {"->"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ranked}>
          <View style={styles.numberTwo}>
            <Text style={styles.number}>2</Text>
            {users[1] && users[1].photo ? (
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
              {users[1] && users[1].nick
                ? users[1].nick
                : users[1]
                ? users[1].name
                : ""}
            </Text>
            <Text style={styles.punctation}>
              {users[1] && users[1].points ? users[1].points : 0} pkt
            </Text>
          </View>
          <View style={styles.numberOne}>
            <Text style={styles.number}>1</Text>
            <Image
              style={styles.crown}
              source={require("../../assets/crown.png")}
            />
            {users[2] && users[2].photo ? (
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
              {users[2] && users[2].nick
                ? users[2].nick
                : users[2]
                ? users[2].name
                : ""}
            </Text>
            <Text style={styles.punctation}>
              {users[2] && users[2].points ? users[2].points : 0} pkt
            </Text>
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
        {nextMatches && nextMatches[0] && (
          <View style={styles.elements}>
            <Text style={styles.title}>Następne mecze</Text>
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
        )}
        {lastMatches && lastMatches[0] && (
          <View style={styles.elements}>
            <Text style={styles.title}>Poprzednie mecze</Text>
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
        )}
        <View style={styles.elements}>
          <Text style={styles.title}>Ranking Mistrzów</Text>
          <View style={styles.flatlist}>
            <RowKing />
          </View>
        </View>
        <View style={styles.elements}>
          <Text style={styles.title}>Ranking Królów Strzelców</Text>
          <View style={styles.flatlist}>
            <RowFootballer />
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <FragmentLoading />
  );
}
