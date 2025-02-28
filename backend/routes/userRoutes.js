const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


console.log("getUserProfile:", getUserProfile);
console.log("updateUserProfile:", updateUserProfile);
console.log("protect:", protect);

const router = express.Router();

router.post("/login", loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post("/register", registerUser); // Ensure this exists


module.exports = router;
