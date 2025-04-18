import admin from "../config/firebase-config.js";
import User from "../models/User.js"; // Import User model

const verifyFirebaseToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token && req.cookies) {
    token = req.cookies.token; // Extract token from cookie if not in header
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Find the user in the database using the Firebase UID
    const user = await User.findOne({ email: decodedToken.email }); // Use email to find the user

    if (!user) {
      console.warn(`Unauthorized access attempt: User not found for email ${decodedToken.email}`);
      return res.status(404).json({ message: "User not found in the database." });
    }

    // Attach the user's details to req.user
    req.user = {
      _id: user._id, // Use the MongoDB _id of the user
      email: decodedToken.email,
      name: decodedToken.name || user.name, // Fallback to user.name if decodedToken.name is missing
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;
