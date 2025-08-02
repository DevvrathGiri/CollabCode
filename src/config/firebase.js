import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  // ✅ Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmefCOsE68NuuJIMWssVXZC17pysDVrN8",
    authDomain: "code-studio-8ef8a.firebaseapp.com",
    projectId: "code-studio-8ef8a",
    storageBucket: "code-studio-8ef8a.firebasestorage.app",
    messagingSenderId: "645712276459",
    appId: "1:645712276459:web:f18c9e655b1986feaa07ae",
    measurementId: "G-NC42RSQZ9X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const firestore = getFirestore(app);
const rtdb = getDatabase(app);  // ✅ Initialize Realtime Database

// Set Auth Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase Auth Persistence Set to Local"))
  .catch((error) => console.error("Firebase Auth Persistence Error:", error));

export { auth, db, rtdb };
export default app;
