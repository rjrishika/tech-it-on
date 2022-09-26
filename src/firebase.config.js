// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB93Gn0PnjHR0nGEVrhHc8E598dT-VJNGk",
  authDomain: "house-marketplace-app-70786.firebaseapp.com",
  projectId: "house-marketplace-app-70786",
  storageBucket: "house-marketplace-app-70786.appspot.com",
  messagingSenderId: "435832809441",
  appId: "1:435832809441:web:b3406d0abb569e661394a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const db = getFirestore()