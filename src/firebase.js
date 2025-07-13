// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 引入 Firestore

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyBaK1O5W5pPk2GUWZ84EXdjoBneRMABB6Q",
  authDomain: "shopping-website-52c65.firebaseapp.com",
  projectId: "shopping-website-52c65",
  storageBucket: "shopping-website-52c65.firebasestorage.app",
  messagingSenderId: "815560022538",
  appId: "1:815560022538:web:6100d979b42721ea6f5df3",
  measurementId: "G-G8YP77NF0H",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //  初始化 Firestore

// 初始化 Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
 

export { auth, provider, db };
