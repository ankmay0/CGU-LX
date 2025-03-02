import express from "express";

import User from "../models/User.js"; 
import googleLogin from "../controllers/authController.js"; // ✅ Ensure correct import

const router = express.Router();

router.post("/google-login", googleLogin);


// ✅ Define registerUser before using it
const registerUser = async (req, res) => {
    try {
        const { name, phone, course, semester, email } = req.body;

        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        // Create a new user
        const newUser = new User({ name, phone, course, semester, email });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Use registerUser after defining it
router.post("/google-login", googleLogin);
router.post("/register", registerUser);

export { registerUser }; // ✅ Correct ES Module export
export default router;   // ✅ Keep ES Module export

