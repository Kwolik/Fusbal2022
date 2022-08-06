import React, { useEffect, useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { auth, db } from "./components/firebase";
import * as SplashScreen from "expo-splash-screen";
import mainContext from "./components/mainContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthentication(user ? true : false);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 800);
      if (user) {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log(user);
            console.log("Document data:", docSnap.data());
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
    <mainContext.Provider value={mainC}>
      <NavigationContainer>
        {authentication ? (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </mainContext.Provider>
  );
}
