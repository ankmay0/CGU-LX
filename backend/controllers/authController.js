import User from "../models/User.js";
import admin from "firebase-admin";
import fs from "fs";

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("./config/firebaseAdminConfig.json", "utf-8"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const googleLogin = async (req, res) => {
    console.log("📩 Received Request on /google-login");
    console.log("📦 Full Request Body:", req.body);
    console.log("🔑 Extracted Token:", req.body.token);

    if (!req.body.token) {
        return res.status(400).json({ message: "Token is missing" });
    }

    try {
        const { token } = req.body;

        // Verify the Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { name, email, picture, phone_number } = decodedToken;
        console.log("✅ Decoded Token:", decodedToken);

        // Ensure only CGU emails are allowed
        if (!email.endsWith("@cgu-odisha.ac.in")) {
            return res.status(403).json({ message: "Only CGU college emails are allowed." });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                avatar: picture,
                phoneNumber: phone_number || "Not provided", // Store phone number if available
            });
            await user.save();
        } else {
            // Update user phone number if it was missing before
            if (!user.phoneNumber && phone_number) {
                user.phoneNumber = phone_number;
                await user.save();
            }
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default googleLogin;
