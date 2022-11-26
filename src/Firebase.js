// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuC3J85wqVhbo-QP_y3Q0lM5BT8N0OdXc",
  authDomain: "todo-app-2-142a3.firebaseapp.com",
  projectId: "todo-app-2-142a3",
  storageBucket: "todo-app-2-142a3.appspot.com",
  messagingSenderId: "1026206582912",
  appId: "1:1026206582912:web:f374988c5cb7fd6542fe65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);