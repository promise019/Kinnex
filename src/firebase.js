import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO0toGfMzc6sTmPJwS6N19z2cEoam2L2w",
  authDomain: "kinnex-b7001.firebaseapp.com",
  projectId: "kinnex-b7001",
  storageBucket: "kinnex-b7001.firebasestorage.app",
  messagingSenderId: "209766831689",
  appId: "1:209766831689:web:b55e44f79d8da5b0c09198"
};

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  export {auth, db}