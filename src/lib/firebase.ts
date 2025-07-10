<<<<<<< HEAD
// Firebase authentication removed
// This file previously contained Firebase configuration and authentication setup
// Authentication functionality has been removed from the application

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyBjO5Y-x_wryIvEaNmKiqocDAGIXN3orZg",

  authDomain: "project-cars-6aacf.firebaseapp.com",

  projectId: "project-cars-6aacf",

  storageBucket: "project-cars-6aacf.firebasestorage.app",

  messagingSenderId: "880337609046",

  appId: "1:880337609046:web:987dadda5bd335a63936f7",

  measurementId: "G-B9EQX47PFQ"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
=======
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
