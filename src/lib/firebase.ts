// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ ADD THIS
// import { getAnalytics } from "firebase/analytics"; ❌ REMOVE (not needed now)
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEwehohnhWOpAXfb8lfxIOXuycFJUIKKI",
  authDomain: "tathagat-pharma.firebaseapp.com",
  projectId: "tathagat-pharma",
  storageBucket: "tathagat-pharma.appspot.com", // ✅ better use this
  messagingSenderId: "1023422464440",
  appId: "1:1023422464440:web:545ade3a93151f4aa90f4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firestore DB export
export const db = getFirestore(app);

export const auth = getAuth(app);