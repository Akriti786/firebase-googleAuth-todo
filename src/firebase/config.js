import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfHotP9BkJ1U6LZaLxZttQAivNaeOixEs",
    authDomain: "fire-todo-app-6baf1.firebaseapp.com",
    projectId: "fire-todo-app-6baf1",
    storageBucket: "fire-todo-app-6baf1.firebasestorage.app",
    messagingSenderId: "149914166777",
    appId: "1:149914166777:web:a7847bec52ec1060924928"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);