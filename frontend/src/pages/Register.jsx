import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("1st Semester");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const email = result.user.email;

            // Restrict to college emails
            if (!email.endsWith("@cgu-odisha.ac.in")) {
                setError("Use your college email (@cgu-odisha.ac.in) to register.");
                return;
            }

            // Send data to backend
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, course, semester, email }),
            });

            const data = await response.json();
            if (data.success) {
                console.log("User registered successfully!");
                navigate("/");
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            setError("Google Sign-In failed.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Register</h2>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />

                <input
                    type="text"
                    placeholder="WhatsApp Registered Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />

                <input
                    type="text"
                    placeholder="Course (e.g., B.Tech CSE)"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />

                <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                >
                    {[...Array(8)].map((_, i) => (
                        <option key={i} value={`${i + 1}th Semester`}>
                            {`${i + 1}th Semester`}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
