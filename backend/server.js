import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { sendOtp } from "./utils/otpService.js"; // Import OTP service

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// OTP Route (WhatsApp OTP via Twilio)
app.post("/api/otp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

  try {
    const response = await sendOtp(phoneNumber, otp.toString());

    if (response.success) {
      return res.status(200).json({ message: "OTP sent successfully", otp });
    } else {
      return res.status(500).json({ message: "Failed to send OTP", error: response.error });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CGU_LX", // Set database name explicitly
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Start server after connecting to DB
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

// Run the server
startServer();
