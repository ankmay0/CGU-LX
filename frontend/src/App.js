import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile";

function App() {
    return (
        <div className="app-content">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
                <Route path="/buy" element={<Buy />} />  {/* Removed ProtectedRoute */}
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
