import admin from "../config/firebase-config.js";
import User from "../models/User.js";

export const googleLogin = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        console.log("🔍 Received Token:", token); // Log token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        // ✅ Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("✅ Decoded Token:", decodedToken); // Log decoded data

        const { email, name, picture } = decodedToken;

        // 🔍 Search for user by email
        let user = await User.findOne({ email });

        // ❌ If user is not found, return 307 to redirect to registration
        if (!user) {
            return res.status(401).json({ success: false, message: "User not registered." });
        }

        // Set cookie with token, expires in 1 day
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        // ✅ Return user data
        return res.json({ success: true, token, user });

    } catch (error) {
        console.error("🚨 Token Verification Error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

// New endpoint to refresh token cookie
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify current token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email } = decodedToken;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not registered." });
        }

        // Get new token from Firebase Admin SDK (simulate refresh)
        // Firebase tokens are short-lived, so client should get new token from Firebase SDK
        // Here, just re-set the cookie with the same token for demonstration
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.json({ success: true, message: "Token refreshed" });
    } catch (error) {
        console.error("🚨 Token Refresh Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export const googleRegister = async (req, res) => {
    try {
        const { name, email, phone, course, semester } = req.body;

        if (!name || !email || !phone || !course || !semester) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already registered" });
        }
        

        const newUser = new User({ name, email, phone, course, semester });
        await newUser.save();

        return res.json({ success: true, message: "User  successfully!" });
    } catch (error) {
        console.error("❌ Google Register Error:", error);
        return res.status(500).json({ success: false, message: "Server error, please try again later." });
    }
};

export const getProfile = async (req, res) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const user = await User.findOne({ email: req.user.email }).select(
            "name phone course semester email profilePicture"
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        return res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const { semester, avatar } = req.body; // Extract semester & avatar fields

        const updatedFields = {};
        if (semester) updatedFields.semester = semester;
        if (avatar) updatedFields.avatar = avatar; // ✅ Allow avatar update

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            { $set: updatedFields },
            { new: true, select: "semester avatar" } // Return updated fields
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ 
            success: true, 
            message: "Profile updated!", 
            semester: updatedUser.semester, 
            avatar: updatedUser.avatar 
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
