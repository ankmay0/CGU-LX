import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCD1vgrm2IKbXuo9XcQwmdMpbk5yMmj10s",
    authDomain: "cgu-lx.firebaseapp.com",
    projectId: "cgu-lx",
    storageBucket: "cgu-lx.firebasestorage.app",
    messagingSenderId: "1012710246199",
    appId: "1:1012710246199:web:acf428cbe88bdab670fcb2",
    measurementId: "G-GBV812KFS3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
