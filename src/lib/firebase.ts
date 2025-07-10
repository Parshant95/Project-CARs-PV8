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
