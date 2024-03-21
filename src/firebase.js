/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC5OEL8yE564PEXIH1m9dKe6wzsIMM2ILM",
  authDomain: "daily-biz.firebaseapp.com",
  projectId: "daily-biz",
  storageBucket: "daily-biz.appspot.com",
  messagingSenderId: "256687797093",
  appId: "1:256687797093:web:e36a49fde2eed2e367e78c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  try {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(fbFunctions, "localhost", 5001);
    console.log("Firebase emulators connected successfully.");
  } catch (error) {
    console.error("Error connecting Firebase emulators:", error);
  }
}

export { app, db, auth, fbFunctions };