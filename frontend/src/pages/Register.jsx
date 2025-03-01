import { useState, useEffect } from "react";
import { sendOTP, verifyOTP, auth, googleProvider, signInWithPopup } from "../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Initialize reCAPTCHA only when the component is mounted
        if (!window.recaptchaVerifier && document.getElementById("recaptcha-container")) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => console.log("reCAPTCHA verified!"),
                "expired-callback": () => {
                    console.log("reCAPTCHA expired. Resetting...");
                    window.recaptchaVerifier.clear();
                    delete window.recaptchaVerifier;
                }
            });
        }
    }, []);

    const handleSendOTP = async () => {
        setError(""); 

        if (!phoneNumber.match(/^\+\d{10,15}$/)) { 
            setError("Enter a valid phone number with country code (e.g., +911234567890)");
            return;
        }

        setLoading(true);

        try {
            if (!window.recaptchaVerifier) {
                console.error("reCAPTCHA not initialized! Retrying...");
                return;
            }
            
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(result);
            console.log("OTP sent successfully!");
        } catch (error) {
            console.error("Error sending OTP:", error.message);
            setError("Failed to send OTP. Try again.");
        }

        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        setError(""); 
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        if (!confirmationResult) {
            setError("OTP not sent. Click 'Send OTP' first.");
            return;
        }

        setLoading(true);
        try {
            await verifyOTP(confirmationResult, otp);
            console.log("OTP Verified! Proceeding to Google Sign-In.");
            handleGoogleSignIn();
        } catch (error) {
            console.error("Error verifying OTP:", error.message);
            setError("Invalid OTP. Please try again.");
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-In Success:", result.user);
            navigate("/");
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            setError("Failed to sign in with Google.");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Register</h2>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                <button 
                    onClick={handleSendOTP} 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send OTP"}
                </button>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border p-2 rounded w-full mt-3 mb-3"
                />
                <button 
                    onClick={handleVerifyOTP} 
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* ✅ reCAPTCHA Container (Ensure it's rendered in the DOM) */}
                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
};

export default Register;
