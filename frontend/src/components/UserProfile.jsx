import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext); // Get authenticated user
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const response = await fetch(`/api/user/${firebaseUser.uid}`);
                    const userData = await response.json();
                    setUser(userData);
                    fetchUserProducts(firebaseUser.uid);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch products listed by the user
    const fetchUserProducts = async (userId) => {
        try {
            const response = await fetch(`/api/products?userId=${userId}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching user products:", error);
        }
    };

    if (!user) {
        return <p className="text-red-500 text-center mt-10">User not found. Please log in.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 flex flex-col items-center">
                    <img 
                        className="w-24 h-24 rounded-full border-2 border-gray-300" 
                        src={user.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile"
                    />
                    <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>

                    <Link to="/edit-profile">
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>

            {/* User's Listed Products */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-center">Your Listings</h3>
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center">You have not listed any products yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white shadow p-4 rounded-lg">
                                <img className="w-full h-40 object-cover rounded-md" src={product.image} alt={product.title} />
                                <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
                                <p className="text-gray-600">${product.price}</p>
                                <Link to={`/product/${product._id}`} className="text-blue-500 mt-2 inline-block">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
