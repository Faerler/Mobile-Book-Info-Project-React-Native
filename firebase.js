// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvDRV5spt6piYWjuQ8d_P6vt0QnmsJc5M",
    authDomain: "proje-d754e.firebaseapp.com",
    projectId: "proje-d754e",
    storageBucket: "proje-d754e.appspot.com",
    messagingSenderId: "922038736754",
    appId: "1:922038736754:web:83494b9fc99dfc1244afeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
