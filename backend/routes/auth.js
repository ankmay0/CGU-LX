const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Incoming Request:", { name, email, password });

    try {
        // Check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log("User Exists Check:", userExists.rows);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hashedPassword);

        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        console.log("User Registered:", newUser.rows[0]);

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.rows[0].id }, "your_jwt_secret", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});





module.exports = router;
