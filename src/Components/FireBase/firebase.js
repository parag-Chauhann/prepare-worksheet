// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7J4hBaMlEuS2uFtqQZvfZXhFxKhIC290",
  authDomain: "audit-worksheet-generator.firebaseapp.com",
  projectId: "audit-worksheet-generator",
  storageBucket: "audit-worksheet-generator.appspot.com",
  messagingSenderId: "357666379380",
  appId: "1:357666379380:web:4ebd8d4f42c39bb250a321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app); // Initialize Firestore
export default app;
