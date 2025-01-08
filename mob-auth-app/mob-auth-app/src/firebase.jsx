// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3aJd-USBz_i83JwWKtZGQwx__IjrwRro",
  authDomain: "mob-auth-app-7144d.firebaseapp.com",
  projectId: "mob-auth-app-7144d",
  storageBucket: "mob-auth-app-7144d.firebasestorage.app",
  messagingSenderId: "257388118099",
  appId: "1:257388118099:web:a51b23d713790fc36a86a6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase