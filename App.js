import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/Start/LoginScreen";
import RegistrationScreen from "./screens/Start/RegistrationScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import SettingsScreen from "./screens/Settings/SettingsScreen";
import AllMatches from "./screens/Matches/AllMatches";
import MatchScreen from "./screens/Matches/MatchScreen";
import TeamandPlayerWin from "./screens/TeamandPlayerWin";
import Scoreboard from "./screens/Ratings/Scoreboard";
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
      "Work-Sans-Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
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
              screenOptions={{
                tabBarActiveTintColor: "#0D4A85",
                tabBarInactiveTintColor: "rgba(0, 0, 0, 0.6)",
                headerShown: false,
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
                component={MatchStackScreen}
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
                component={Scoreboard}
                options={{
                  tabBarLabel: "Ranking",
                  tabBarLabelStyle: styles.label,
                  headerShown: false,
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

const MatchStack = createNativeStackNavigator();
const MatchStackScreen = () => (
  <MatchStack.Navigator headerMode={"none"}>
    <MatchStack.Screen
      name={"AllMatches"}
      component={AllMatches}
      options={{ headerShown: false }}
    />
    <MatchStack.Screen
      name={"MatchScreen"}
      component={MatchScreen}
      options={{ headerShown: false }}
    />
  </MatchStack.Navigator>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontFamily: "Work-Sans",
    fontStyle: "normal",
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
});
