import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../components/firebase";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";

export default function TeamandPlayerWin() {
  const [id, setId] = useState();
  const [footballer, setFootballer] = useState();
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [photo, setPhoto] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid);
        const docRef = firestore.collection("footballer").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setFootballer(doc.data().name);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    });

    return unsubscribe;
  }, []);

  const typeFootballer = () => {
    if (footballer && id) {
      const docRef = firestore.collection("footballer").doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef.update({ name: footballer });
          } else {
            docRef.set({ name: footballer });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };

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
              setEmail(doc.data().email);
              doc.data().nick && setNick(doc.data().nick);
              doc.data().photo && setPhoto(doc.data().photo);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    });

    return unsubscribe;
  }, []);

  //Zalezy jak sandra zaprojektuje to albo aktualizowac wszystkie dane 1 przyciskiem (email,id,name,nick) lub do kazdego inny przycisk
  const changeNameUser = () => {
    // setDoc(doc(db, "users", id), {
    //     id: id,
    //     name: nameUser,
    //     nick: "",
    //     email: "",
    //     photo: "",
    // });
    firestore.collection("users").doc(id).update({ name: nameUser });
  };

  const changeNick = () => {
    firestore.collection("users").doc(id).update({ nick: nick });
  };

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
        }) //Poprawic catch pozniej
        .catch((error) => alert("Zbyt duze zdj zmniejsz je!"));
    }
  };

  //Podobno zrobić zwyciestwe mistrzostw lub wypisac wszystkie drużyny i mozliwosc opcji zaznaczenia 1

  useEffect(() => {
    //registerForPushNotification();
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   console.log(notification);
    // });
    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });
    // return () => {
    //   cleanup
    // }
    //Działa o konkretnej minucie w ten sposób
    //Zrobić tak te powiadomienia żeby od razu zmapowac dla kazdego id meczu
    //a po prostu codziennie bedzie sprawdzalo date i ifami to korelowac
    //Sprawdzic tez na sztywnmo czy jak ustawie 3 powiadomienia a potem 2 zmienie godzine to czy te o starej godzinei tez sie wywolaja
    //Przy rejetsracji dodac by do bazy zapisywal sie getExpoPushTokenAsync w celu wyslania niestandardowych powiadomien
    // const trigger = new Date();
    // trigger.setMinutes(200);
    // console.log(trigger);
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "Time's up!",
    //     body: "Change sides!",
    //   },
    //   trigger,
    // });
  }, []);

  // async function registerForPushNotification() {
  //   const { status: existingStatus } =
  //     await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     alert("Failed to get push token for push notification!");
  //     return;
  //   }
  //   const token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log(token);
  // }

  // if (Platform.OS === "android") {
  //   Notifications.setNotificationChannelAsync("default", {
  //     name: "default",
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: "#FF231F7C",
  //   });
  // }

  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   // Register for push notification
  //   const token = registerForPushNotificationsAsync();

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       notificationCommonHandler(notification);
  //     });

  //   // This listener is fired whenever a user taps on or interacts with a notification
  //   // (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       notificationCommonHandler(response.notification);
  //       notificationNavigationHandler(response.notification.request.content);
  //     });

  //   // The listeners must be clear on app unmount
  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  // const notificationCommonHandler = (notification) => {
  //   // save the notification to reac-redux store
  //   console.log("A notification has been received", notification);
  // };

  // const notificationNavigationHandler = ({ data }) => {
  //   // navigate to app screen
  //   console.log("A notification has been touched", data);
  // };

  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    });
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(90,210,244)", "rgb(224,82,99)"],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  return (
    <View style={styles.container}>
      <Text>Type the best player</Text>
      <TextInput
        placeholder="Robert Lewandowski"
        value={footballer}
        onChangeText={(text) => setFootballer(text)}
        style={styles.input}
      ></TextInput>
      <TouchableOpacity onPress={typeFootballer}>
        <Text>Obstaw Piłkarza</Text>
      </TouchableOpacity>
      <View>
        <Text>Team Win</Text>
      </View>
      <Text style={styles.email}>{email}</Text>
      {photo ? (
        <Image
          style={{ width: "40%", height: "20%" }}
          source={{
            uri: photo,
          }}
        />
      ) : (
        <Avatar.Text size={124} label={nameUser.substring(0, 1)} />
      )}

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <Animated.View style={{ ...styles.box, ...animatedStyle }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    color: "red",
    fontSize: 26,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "#5AD2F4",
  },
});

// const registerForPushNotificationsAsync = async () => {
//   let token;

//   if (Constants.isDevice) {
//     // we check if we have access to the notification permission
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       // if we dontt have access to it, we ask for it
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       // user doesnt allow us to access to the notifications
//       alert("Failed to get push token for push notification!");
//       return;
//     }

//     // obtain the expo token
//     token = (await Notifications.getExpoPushTokenAsync()).data;

//     // log the expo token in order to play with it
//     console.log(token);
//   } else {
//     // notifications only work on physcal devices
//     alert("Must use physical device for Push Notifications");
//   }

//   // some android configuration
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// };
