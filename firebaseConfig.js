import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANYMcd3tnp7hRHkH8NmNSa48TDTeHIX2c",
  authDomain: "openix-e6f73.firebaseapp.com",
  projectId: "openix-e6f73",
  storageBucket: "openix-e6f73.appspot.com",
  messagingSenderId: "2852457975",
  appId: "1:2852457975:web:f2257518e223d87b0bf2f2",
  measurementId: "G-PCY1E0L6Y4",
  databaseURL: "https://openix-e6f73-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const databaseRealtime = getDatabase(app);

const gateRef = ref(databaseRealtime, "gate");

onValue(gateRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    Object.keys(data).forEach((key) => {
      const entry = data[key];
    });
  }
});

const sendDataToFirebase = () => {
  const timestamp = Date.now();
  const data = {
    button_pressed: true,
    timestamp: timestamp,
  };

  const gateButtonRef = ref(databaseRealtime, "gate_button");
  push(gateButtonRef, data);

  console.log("Data sent to 'gate_button' node:", data);

  setTimeout(() => {
    remove(gateButtonRef);
    console.log("Data deleted from 'gate_button' node");
  }, 4000);
};

export { auth, app, db, databaseRealtime, sendDataToFirebase };
