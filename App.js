import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { auth } from "./firebase";
import * as SplashScreen from "expo-splash-screen";

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
    });

    return unsubscribe;
  }, []);

  return (
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
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
