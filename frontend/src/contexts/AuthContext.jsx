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
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();
                    console.log("📤 Sending Token:", token);
    
                    const res = await fetch("http://localhost:5000/api/auth/google-login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
    
                    const data = await res.json();
                    if (res.status === 307) {
                        console.warn("🚨 User not registered. Redirecting...");
                        
                        Swal.fire({
                            icon: "warning",
                            title: "🚨 Access Restricted",
                            text: "Use your College Email or Register to Continue.",
                            confirmButtonText: "OK",
                            confirmButtonColor: "black",
                            background: "white",
                            color: "black",
                            customClass: {
                                popup: "rounded-xl",
                                confirmButton: "rounded-lg"
                            }
                        });

                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser(null);
    
                        setTimeout(() => {
                            navigate("/register");
                        }, 300);
                    } else if (res.ok) {
                        console.log("✅ Backend Login Success:", data);
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        setUser(data.user);
                    } else {
                        console.error("🚨 Backend Login Failed:", data);
                        await logout();
                    }
                } catch (error) {
                    console.error("Auth Error:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, [navigate]);

    const signInWithGoogle = async (register = false, userData = {}) => {
        try {
            
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();
            const email = user.email;

            

            if (!email.endsWith("@cgu-odisha.ac.in")) {
                await signOut(auth);
                console.warn("❌ Unauthorized Email: " + email);
                console.log("🚨 Test Error Message");
                return { error: "❌ Use your college email to continue." };
            }

            const endpoint = register ? "google-register" : "google-login";
            const body = register
                ? JSON.stringify({ ...userData, name: user.displayName, email })
                : null;

            const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: body ? body : undefined,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Authentication failed.");
            }

            if (register && res.status === 409) {
                return { alreadyRegistered: true, message: "⚠️ You are already registered!" };
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            navigate("/");
            return data;
        } catch (error) {
            console.error("🚨 Google Auth Error:", error.message);
            return { error: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
