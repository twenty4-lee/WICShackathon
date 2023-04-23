// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getStorage} from "firebase/storage";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJdLbwOAr27upPBUspgPqBquNWBHVVgVo",
  authDomain: "mathpuzzle-4d513.firebaseapp.com",
  projectId: "mathpuzzle-4d513",
  storageBucket: "mathpuzzle-4d513.appspot.com",
  messagingSenderId: "475788223372",
  appId: "1:475788223372:web:455ff487bb8a26b3376ca9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {auth};


