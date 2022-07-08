
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDv64iAN3PKhgDrzLm4RMWB61ilCIn0LEA",
  authDomain: "nextfire-1c683.firebaseapp.com",
  projectId: "nextfire-1c683",
  storageBucket: "nextfire-1c683.appspot.com",
  messagingSenderId: "49737389319",
  appId: "1:49737389319:web:4eef981c46cda762c3e1a2",
  measurementId: "G-LEYRJLBEJK"
};

// Initialize Firebase
// const apps = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();