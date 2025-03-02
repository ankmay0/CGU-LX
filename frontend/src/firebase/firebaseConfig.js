import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPhoneNumber, 
    RecaptchaVerifier, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";

// ✅ Firebase Configuration (Replace with environment variables in production)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCD1vgrm2IKbXuo9XcQwmdMpbk5yMmj10s",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "cgu-lx.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "cgu-lx",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "cgu-lx.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1012710246199",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1012710246199:web:acf428cbe88bdab670fcb2",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-GBV812KFS3"
};



// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en"; // OTP messages in English

// ✅ Google Authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");

// ✅ Function to set up reCAPTCHA verifier
const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: () => console.log("reCAPTCHA verified!"),
            "expired-callback": () => {
                console.log("reCAPTCHA expired. Resetting...");
                window.recaptchaVerifier.clear();
                setUpRecaptcha();
            }
        });
    }
};

// ✅ Function to send OTP
const sendOTP = async (phoneNumber) => {
    try {
        setUpRecaptcha(); // Ensure reCAPTCHA is initialized
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

// ✅ Function to verify OTP
const verifyOTP = async (confirmationResult, otp) => {
    try {
        const result = await confirmationResult.confirm(otp);
        return result.user; // Return authenticated user
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

export { auth, googleProvider, signInWithPopup, sendOTP, verifyOTP };
export default app;
