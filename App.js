import React, { useEffect, useState, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MatchScreen from "./screens/MatchScreen";
import TypeScore from "./screens/TypeScore";
import TeamandPlayerWin from "./screens/TeamandPlayerWin";
import { auth, db } from "./components/firebase";
import * as SplashScreen from "expo-splash-screen";
import mainContext from "./components/mainContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import * as Font from "expo-font";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [authentication, setAuthentication] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Work-Sans": require("./assets/fonts/WorkSans-Regular.ttf"),
    });
    setLoaded(true);
  };

  loadFonts();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthentication(user ? true : false);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 800);
      if (user) {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            // console.log(user);
            // console.log("Document data:", docSnap.data());
          } else {
            setDoc(doc(db, "users", user.uid), {
              id: user.uid,
              name: user.displayName,
              nick: "",
              email: user.email,
              photo: user.photoURL,
            });
          }
        });
      }
    });

    return unsubscribe;
  }, []);

  const mainC = useMemo(
    () => ({
      signOutUser: () => auth.signOut(),
    }),
    []
  );

  return (
    loaded && (
      <mainContext.Provider value={mainC}>
        <NavigationContainer>
          {authentication ? (
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: "#0D4A85",
                inactiveTintColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Home",
                  tabBarLabelStyle: styles.label,
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons
                      name="home"
                      color={color}
                      size={26}
                      style={{
                        marginTop: 4,
                      }}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Match"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Mecze",
                  tabBarLabelStyle: styles.label,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="calendar-month"
                      color={color}
                      size={26}
                      style={{
                        marginTop: 4,
                      }}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Ranking"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Ranking",
                  tabBarLabelStyle: styles.label,
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons
                      name="star"
                      color={color}
                      size={26}
                      style={{
                        marginTop: 4,
                      }}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarLabel: "Moje konto",
                  tabBarLabelStyle: styles.label,
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons
                      name="account-circle"
                      color={color}
                      size={26}
                      style={{
                        marginTop: 4,
                      }}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Registration"
                component={RegistrationScreen}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </mainContext.Provider>
    )
  );
}

const styles = StyleSheet.create({
  navigator: {
    height: 86,
  },
  label: {
    fontSize: 11,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "600",
    alignItems: "center",
    marginBottom: 4,
  },
});
