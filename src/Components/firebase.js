import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCg4lyynGbM-Tl-91pwy9YUpvS5ONBiRCM",
  authDomain: "todo-app-801fe.firebaseapp.com",
  projectId: "todo-app-801fe",
  storageBucket: "todo-app-801fe.appspot.com",
  messagingSenderId: "235552536423",
  appId: "1:235552536423:web:8915c629cf9fcab63a21c2",
  databaseURL: "https://todo-app-801fe-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
