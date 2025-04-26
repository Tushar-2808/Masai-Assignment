// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzaDasiQmkB0z5epQHSWTjSFPqm6x-58E",
  authDomain: "evaluation-f00b2.firebaseapp.com",
  projectId: "evaluation-f00b2",
  storageBucket: "evaluation-f00b2.firebasestorage.app",
  messagingSenderId: "1057079947764",
  appId: "1:1057079947764:web:fc661b4475b6a0324809a1",
  measurementId: "G-3YH766VSKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
