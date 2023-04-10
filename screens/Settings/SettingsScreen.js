import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./SettingsScreen.style";
import Svg, { Path } from "react-native-svg";
import { auth, firestore } from "../../components/firebase";
import { TextInput, List, Avatar, Snackbar } from "react-native-paper";
import OneScoreMatch from "../OneScoreMatch";
import * as ImagePicker from "expo-image-picker";
import { TeamList } from "../../components/TeamList";
import mainContext from "../../components/mainContext";
import FragmentLoading from "../../components/fragmentLoading";

export default function SettingsScreen({ navigation }) {
  const { signOutUser } = useContext(mainContext);
  const [id, setId] = useState();
  const [points, setPoints] = useState("");
  const [photo, setPhoto] = useState("");
  const [matches, setMatches] = useState([]);
  const [rank, setRank] = useState([]);
  const [footballer, setFootballer] = useState("");
  const [team, setTeam] = useState("");
  const [codeTeam, setCodeTeam] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [nick, setNick] = useState("");
  const [val, setVal] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [textSnackbar, setTextSnackbar] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const todoRef = firestore.collection("users").doc(id).collection("types");
  const todoRef2 = firestore.collection("users").orderBy("points");

  var date = new Date().toTimeString();
  var day = new Date().getDate(); //Current Date
  if (day < 10) day = "0" + day;
  var month = new Date().getMonth() + 1; //Current Month
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes

  useEffect(() => {
    const updateMachtes = todoRef2.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { points } = doc.data();
        match.push({
          id: doc.id,
          points,
        });
      });
      setRank([...match].sort((a, b) => (a.points < b.points ? 1 : -1)));
    });

    return updateMachtes;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid);
        const docRef = firestore.collection("users").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              doc.data().name && setNameUser(doc.data().name);
              doc.data().nick && setNick(doc.data().nick);
              doc.data().photo && setPhoto(doc.data().photo);
              doc.data().points && setPoints(doc.data().points);
              setTimeout(() => setVal(true), 200);
            } else {
              setTextSnackbar("Nie znaleziono dokumentu"),
                setVisibleSnackbar(true);
            }
          })
          .catch((error) => {
            setTextSnackbar("Poblem z dokumentem: " + error),
              setVisibleSnackbar(true);
          });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = firestore.collection("footballer").doc(user.uid);
        const docRef2 = firestore.collection("king").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setFootballer(doc.data().name);
            } else {
              setTextSnackbar("Nie znaleziono dokumentu"),
                setVisibleSnackbar(true);
            }
          })
          .catch((error) => {
            setTextSnackbar("Poblem z dokumentem: " + error),
              setVisibleSnackbar(true);
          });

        docRef2
          .get()
          .then((doc) => {
            if (doc.exists) {
              setTeam(doc.data().team);
            } else {
              setTextSnackbar("Nie znaleziono dokumentu"),
                setVisibleSnackbar(true);
            }
          })
          .catch((error) => {
            setTextSnackbar("Poblem z dokumentem: " + error),
              setVisibleSnackbar(true);
          });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateMachtes = todoRef.onSnapshot((querySnapshot) => {
      const match = [];
      querySnapshot.forEach((doc) => {
        const { type, points } = doc.data();
        match.push({
          id: doc.id,
          type,
          points,
        });
      });
      setMatches(match);
    });

    return updateMachtes;
  }, [id]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      const base = `data:image/jpg;base64,${result.base64}`;
      setPhoto(base);

      firestore
        .collection("users")
        .doc(id)
        .update({
          photo: base,
        })
        .catch(
          (error) => (
            setTextSnackbar("Problem z rozmiarem zdj: " + error),
            setVisibleSnackbar(true)
          )
        );
    } else {
      setTextSnackbar("Problem z zdjęciem. Spróbuj jeszcze raz"),
        setVisibleSnackbar(true);
    }
  };

  const addTypes = () => {
    if (footballer && id && team) {
      const docRef = firestore.collection("footballer").doc(id);
      const docRef2 = firestore.collection("king").doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({ name: footballer, photo: photo });
          } else {
            docRef.set({ name: footballer, photo: photo });
          }
        })
        .catch((error) => {
          setTextSnackbar("Poblem z dokumentem: " + error),
            setVisibleSnackbar(true);
        });
      docRef2
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef2.update({ team: team, photo: photo, code: codeTeam });
          } else {
            docRef2.set({ team: team, photo: photo, code: codeTeam });
          }
        })
        .catch((error) => {
          setTextSnackbar("Poblem z dokumentem: " + error),
            setVisibleSnackbar(true);
        });

      setTextSnackbar("Twoje typy zostały zapisane"), setVisibleSnackbar(true);
    } else {
      setTextSnackbar("Niepoprawne wartości w polach"),
        setVisibleSnackbar(true);
    }
  };

  const changeName = () => {
    if (nick && nameUser) {
      firestore.collection("users").doc(id).update({ name: nameUser });
      firestore.collection("users").doc(id).update({ nick: nick });

      setTextSnackbar("Twoje dane zostały zmienione"), setVisibleSnackbar(true);
    } else {
      setTextSnackbar("Niepoprawne wartości w polach"),
        setVisibleSnackbar(true);
    }
  };

  return id && val ? (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={288}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: 0 }}
      >
        <Path d="M43 111L0 0H420V290L301 160H160L43 111Z" fill="#0D4A85" />
      </Svg>
      <View style={styles.profile}>
        <View>
          <Text style={styles.rank}>
            #{rank.map((item, index) => item.id == id && index + 1)}
          </Text>
          <Text style={styles.point}>{points} punkty</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {photo ? (
              <Image
                style={styles.photo}
                source={{
                  uri: photo,
                }}
              />
            ) : (
              <Avatar.Text size={88} label={"K"} />
            )}
            <Image
              style={styles.penAvatar}
              source={require("../../assets/pen.png")}
            />
          </TouchableOpacity>
          <Text style={styles.nick}>{nick ? nick : nameUser}</Text>
        </View>
      </View>
      <View style={styles.textScore}>
        <View style={styles.winner}>
          <Text style={styles.textWinner}>Mistrz</Text>
          <Text style={styles.textType}>{team}</Text>
        </View>
        <View style={styles.winner}>
          <Text style={styles.textWinner}>Król strzelców</Text>
          <Text style={styles.textType}>{footballer}</Text>
        </View>
        {month + "." + day < "11.20" ||
        (month + "." + day == "11.20" &&
          hours + ":" + min <=
            (date.substring(19, 22) == "GMT" ? "16" : "17")) ? (
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.infoType}
          >
            <Image
              style={styles.penScore}
              source={require("../../assets/pen.png")}
            />
            <Text style={styles.editScore}>Edytuj obstawienie</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        {matches && matches[0] && (
          <Text style={styles.title}>Obstawione mecze</Text>
        )}
      </View>
      {matches && matches[0] && (
        <View style={styles.list}>
          <View style={styles.flatlist}>
            <FlatList
              data={matches}
              numColumns={1}
              renderItem={({ item }) => (
                <OneScoreMatch
                  id={item.id}
                  navigation={navigation}
                  type={item.type}
                  points={item.points}
                />
              )}
            />
          </View>
        </View>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setVisible2(true)}
        >
          <Text style={styles.editText}>Edytuj swoje dane</Text>
          <Image source={require("../../assets/pen.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOutUser()}>
          <Text style={styles.logout}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
      >
        {textSnackbar}
      </Snackbar>
      {/* POPUP 1 */}
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.containerPopup}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Edytuj obstawianie</Text>
            <View style={styles.popupText}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.popupAnuluj}>ANULUJ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false), addTypes();
                }}
              >
                <Text style={styles.popupEdytuj}>EDYTUJ</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              label="Król Strzelców"
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              value={footballer}
              onChangeText={(text) => setFootballer(text)}
              style={styles.popupInput}
            />
            <TextInput
              label="Mistrz"
              mode="outlined"
              value="dupa"
              outlineColor="rgba(0, 0, 0, 0.23)"
              style={styles.popupMistrz}
              render={() => (
                <List.Section
                  style={{
                    width: "98%",
                    marginLeft: 2,
                  }}
                >
                  <List.Accordion
                    title={team}
                    expanded={expanded}
                    onPress={() => setExpanded(!expanded)}
                    style={{
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <ScrollView
                      style={{
                        height: 120,
                        width: "100%",
                        position: "absolute",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      {TeamList.map((team, index) => (
                        <List.Item
                          title={team.value}
                          key={index}
                          onPress={() => {
                            setCodeTeam(team.code),
                              setTeam(team.value),
                              setExpanded(!expanded);
                          }}
                        />
                      ))}
                    </ScrollView>
                  </List.Accordion>
                </List.Section>
              )}
            />
          </View>
        </View>
      </Modal>
      {/* POPUP 2 */}
      <Modal
        visible={visible2}
        onRequestClose={() => setVisible2(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.containerPopup}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Edytuj swoje dane</Text>
            <TextInput
              label="Imię"
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              value={nameUser}
              onChangeText={(text) => setNameUser(text)}
              style={styles.popupInput}
            />
            <TextInput
              label="Nick"
              mode="outlined"
              outlineColor="rgba(0, 0, 0, 0.23)"
              value={nick}
              onChangeText={(text) => setNick(text)}
              style={styles.popupInput}
            />
            <View style={styles.popupText}>
              <TouchableOpacity onPress={() => setVisible2(false)}>
                <Text style={styles.popupAnuluj}>ANULUJ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible2(false), changeName();
                }}
              >
                <Text style={styles.popupEdytuj}>EDYTUJ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <FragmentLoading />
  );
}
