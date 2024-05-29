// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-bcac4.firebaseapp.com",
  projectId: "real-estate-bcac4",
  storageBucket: "real-estate-bcac4.appspot.com",
  messagingSenderId: "183059343619",
  appId: "1:183059343619:web:2a3c69690aad8acbc5e136"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);