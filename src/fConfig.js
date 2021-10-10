// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  getAuth, updateProfile,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup,
  browserPopupRedirectResolver,
  GithubAuthProvider, GoogleAuthProvider, 
} from "firebase/auth"
import { 
  getFirestore, 
  collection, doc,
  query, where, orderBy,
  addDoc, getDocs, onSnapshot, deleteDoc, updateDoc
} from "firebase/firestore";

import {
  getStorage, 
  ref, uploadString, getDownloadURL, deleteObject
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

//auth
export const authService = initializeAuth(app);
export const auth = {
  getAuth, updateProfile,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup,
  browserPopupRedirectResolver,
  GoogleAuthProvider, GithubAuthProvider,
}

//db store
export const dbService = getFirestore(app);
export const db = {
  collection, doc, 
  query, where, orderBy,
  addDoc, getDocs, onSnapshot, deleteDoc, updateDoc
};

export const storageService = getStorage(app);
export const storage = {
  ref, uploadString, getDownloadURL, deleteObject
}
