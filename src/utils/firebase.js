// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbF-xSQzwG8_GMkUKEMnNnz624EiHvj_M",
  authDomain: "netflixgptclone-47210.firebaseapp.com",
  projectId: "netflixgptclone-47210",
  storageBucket: "netflixgptclone-47210.appspot.com",
  messagingSenderId: "1030003580022",
  appId: "1:1030003580022:web:5e1702aaea02ed3dcb1357",
  measurementId: "G-K925TXEQV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();