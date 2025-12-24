import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9u2qPEUH66olDB-QAQWr1EzC-sycAz-E",
  authDomain: "hall-of-fame-70bbd.firebaseapp.com",
  projectId: "hall-of-fame-70bbd",
  storageBucket: "hall-of-fame-70bbd.firebasestorage.app",
  messagingSenderId: "862108558670",
  appId: "1:862108558670:web:10bb1c7e8aabee9236aa1f",
  measurementId: "G-LF7YVKTC65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
