/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  // You can't use process.env in the client-side code
  // Instead, use a hardcoded value or configure your development environment accordingly
  const firebaseAuthEmulatorUrl = "http://localhost:9099";
  const firestoreEmulatorHost = "localhost";
  const firestoreEmulatorPort = 8080;
  const functionsEmulatorHost = "localhost";
  const functionsEmulatorPort = 5001;

  try {
    connectAuthEmulator(auth, firebaseAuthEmulatorUrl);
    connectFirestoreEmulator(db, firestoreEmulatorHost, firestoreEmulatorPort);
    connectFunctionsEmulator(fbFunctions, functionsEmulatorHost, functionsEmulatorPort);
    console.log("Firebase emulators connected successfully.");
  } catch (error) {
    console.error("Error connecting Firebase emulators:", error);
  }
}

export { app, db, auth, fbFunctions };