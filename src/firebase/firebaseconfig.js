
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-5EBRd7yqc26M4dNo50VLCGYf6kR_20M",
  authDomain: "groupchatapp-d4410.firebaseapp.com",
  projectId: "groupchatapp-d4410",
  storageBucket: "groupchatapp-d4410.appspot.com",
  messagingSenderId: "622734020715",
  appId: "1:622734020715:web:a470866909a859e7fbe12e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);