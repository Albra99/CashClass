// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCbTh7cIC5B0k1xzm-guP8H20OFztQTfxA",
    authDomain: "cashclass.firebaseapp.com",
    projectId: "cashclass",
    storageBucket: "cashclass.firebasestorage.app",
    messagingSenderId: "111768448337",
    appId: "1:111768448337:web:261cdd258b897bca9cf770"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);