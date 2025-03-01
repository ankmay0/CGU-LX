import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, getIdToken } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();
                    console.log("📤 Sending Token:", token);
                     // Get Firebase ID token

                    const res = await fetch("http://localhost:5000/api/auth/google-login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                    });
                    console.log("📤 Sending Token:", token);

                    const data = await res.json();
                    if (res.ok) {
                        setUser(data.user); // Store user from backend response
                    } else {
                        alert(data.message); // Show error if login fails
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
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error.message);
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

