import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;
