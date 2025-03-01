import express from "express";
import googleLogin from "../controllers/authController.js"; // ✅ Ensure correct import

const router = express.Router();

router.post("/google-login", googleLogin);

export default router; // ✅ Use ES Module export
