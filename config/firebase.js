// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkA2tRafE4d0ZWBsgqLHzKqSQIfK_BTeM",
  authDomain: "nology-firestore.firebaseapp.com",
  projectId: "nology-firestore",
  storageBucket: "nology-firestore.appspot.com",
  messagingSenderId: "270295661065",
  appId: "1:270295661065:web:ec4a6efc973fcbf8a816d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


