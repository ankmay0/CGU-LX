import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate college email
        if (!email.endsWith("@college.edu")) {
            setError("Only college emails are allowed.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/register", {
                name,
                email,
                password,
            });
        
            console.log("Registration Response:", res.data);
            alert(res.data.message);
            navigate("/login");
        
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error);
            setError(error.response?.data?.error || "Registration failed");
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="block font-semibold text">Full Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-3"
                        required
                    />

                    <label className="block font-semibold">College Email:</label>
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

                    <label className="block font-semibold">Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-3"
                        required
                    />

                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700">
                        Register
                    </button>
                </form>

                <p className="text-center mt-3">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
