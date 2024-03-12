// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9bw-DNp40LEjcQxtEi4S6RIZAGEeq3eM",
  authDomain: "uploaduserprofile.firebaseapp.com",
  projectId: "uploaduserprofile",
  storageBucket: "uploaduserprofile.appspot.com",
  messagingSenderId: "642776107611",
  appId: "1:642776107611:web:3b88256dbf87b27904cd7e",
  measurementId: "G-WBWT1TEDHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
