// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlL_FN2eWGWyYVw213iSwIjXmu20bVFEw",
    authDomain: "trifectamuse.firebaseapp.com",
    projectId: "trifectamuse",
    storageBucket: "trifectamuse.appspot.com",
    messagingSenderId: "208253272811",
    appId: "1:208253272811:web:00e3ec3a610422f30734ae",
    measurementId: "G-PVB384CVF1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Realtime Database
export const db = getDatabase(app);
