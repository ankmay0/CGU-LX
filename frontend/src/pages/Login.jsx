import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate college email (example: @college.edu)
        if (!email.endsWith("@college.edu")) {
            setError("Only college emails are allowed.");
            return;
        }

        // Simulate authentication (Replace with actual backend API)
        if (email === "student@college.edu" && password === "password123") {
            alert("Login successful!");
            navigate("/home"); // Redirect to Home after login
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="block font-semibold">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-3"
                        required
                    />

                    <label className="block font-semibold">Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-3"
                        required
                    />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
