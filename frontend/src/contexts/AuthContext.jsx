import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  if (!API_BASE_URL) {
    console.error("❌ REACT_APP_BACKEND_URL is not defined in .env");
  }

  // Function to refresh token periodically
  const refreshToken = async (currentUser) => {
    try {
      const token = await currentUser.getIdToken(true); // Force refresh token
      console.log("🔄 Token refreshed:", token);
      // Optionally, you can notify backend or update user state if needed
    } catch (error) {
      console.error("❌ Token refresh error:", error);
      // If refresh fails, logout user
      await logout();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const token = await currentUser.getIdToken();
        console.log("📤 Sending Token:", token);

        const res = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Include cookies in requests
        });

        const responseText = await res.text();
        let data;

        try {
          data = JSON.parse(responseText);
        } catch (error) {
          console.error("🚨 Backend returned invalid JSON:", responseText);
          throw new Error("Invalid JSON response from backend.");
        }

        if (!res.ok) {
          console.warn("❌ Backend returned an error:", data.message);

          if (data.message.includes("User not registered")) {
            navigate("/register", {
              state: {
                email: currentUser.email,
                name: currentUser.displayName,
                picture: currentUser.photoURL,
              },
            });
            setLoading(false);
            return;
          }
        }

        const userData = {
          ...data.user,
          getIdToken: () => Promise.resolve(token),
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };

        setUser(userData);

        // Set interval to refresh token every 15 minutes
        const intervalId = setInterval(() => {
          refreshToken(currentUser);
        }, 15 * 60 * 1000);

        setLoading(false); // Ensure loading is set to false here

        // Clear interval on cleanup
        return () => clearInterval(intervalId);

      } catch (error) {
        console.error("❌ Auth Error:", error);
        setUser(null);
        setLoading(false); // Ensure loading is set to false on error
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async (register = false, userPayload = {}) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      const email = user.email;

      if (!email.endsWith("@cgu-odisha.ac.in")) {
        await signOut(auth);
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Use your college email to continue.",
          confirmButtonText: "OK",
          confirmButtonColor: "black",
        });
        return { error: "Use your college email to continue." };
      }

      const endpoint = register ? "google-register" : "google-login";

      if (register) {
        userPayload = { ...userPayload, name: user.displayName, email };
      }

      const res = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: register ? JSON.stringify(userPayload) : undefined,
        credentials: "include", // Include cookies
      });

      const responseText = await res.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("🚨 Backend returned invalid JSON:", responseText);
        throw new Error("Invalid JSON response from backend.");
      }

      if (data.success === false && data.message.includes("User not registered")) {
        await Swal.fire({
          icon: "warning",
          title: "User Not Registered",
          text: "Please register to continue.",
          confirmButtonText: "OK",
        });

        navigate("/register", {
          state: {
            email,
            name: user.displayName,
            picture: user.photoURL,
          },
        });
        return;
      }

      if (data.message.includes("User already registered")) {
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          text: "You are already registered. Redirecting to login.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

      const userData = {
        ...data.user,
        getIdToken: () => Promise.resolve(token),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      setUser(userData);
      navigate("/");
      return data;
    } catch (error) {
      console.error("❌ Google Auth Error:", error);
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
