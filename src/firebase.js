import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
 
};

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, "localhost", 8080)
}

  export {auth, db}