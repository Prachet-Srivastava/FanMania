// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAoI-8gADbz3o3UD_2TQzlravG21SU-7g",
  authDomain: "fanmania-6c649.firebaseapp.com",
  projectId: "fanmania-6c649",
  storageBucket: "fanmania-6c649.appspot.com",
  messagingSenderId: "529411454141",
  appId: "1:529411454141:web:2b5dcaf0e2d07e70c4b3d4",
  measurementId: "G-G7NFPPKN80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};