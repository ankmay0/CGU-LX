import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      // Restrict to college emails
      if (!email.endsWith("@cgu-odisha.ac.in")) {
        setError("Use your college email (@cgu-odisha.ac.in) to log in.");
        setLoading(false);
        return;
      }

      // Get Firebase ID Token
      const idToken = await result.user.getIdToken();

      // Send login request to backend with token
      const response = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`  // 🔥 Send token here
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("User logged in successfully!");
        navigate("/"); // Redirect to home page
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError("Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
