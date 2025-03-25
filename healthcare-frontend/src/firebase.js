import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0nurccTBlLjzpW1fEIEJ8-PJC-OZ727w",
    authDomain: "healthcare-system-719e6.firebaseapp.com",
    projectId: "healthcare-system-719e6",
    storageBucket: "healthcare-system-719e6.firebasestorage.app",
    messagingSenderId: "116392546862",
    appId: "1:116392546862:web:92dd4681a6ccb0cdc305bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
