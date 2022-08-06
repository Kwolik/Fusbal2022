// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1MNFbVBzY9mj_K38sF_2X_ezMvjCuwy4",
  authDomain: "fusbal2022.firebaseapp.com",
  projectId: "fusbal2022",
  storageBucket: "fusbal2022.appspot.com",
  messagingSenderId: "594410513964",
  appId: "1:594410513964:web:ed97f7a79b00119f4b9389",
  measurementId: "G-HHZWXDTL18",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  //To dodałem by funkcja onAuthStateChanged działa i zapamiętywano użytkownika
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore(app);
const firestore = firebase.firestore();

export { auth, db, firestore };
