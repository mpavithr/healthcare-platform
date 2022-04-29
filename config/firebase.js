import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0hUwaKUpRs6wdOyZGGmhAlFsLOpJg8VU",
  authDomain: "fir-pms-dc7b1.firebaseapp.com",
  projectId: "fir-pms-dc7b1",
  storageBucket: "fir-pms-dc7b1.appspot.com",
  messagingSenderId: "268022564379",
  appId: "1:268022564379:web:4c37913494c2c78018dabe",
  measurementId: "G-3R7089D6EK"
};

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
