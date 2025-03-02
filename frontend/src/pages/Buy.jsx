import { Link } from "react-router-dom";
import { useState } from "react";

const Buy = () => {
    // Dummy product data (replace with API data)
    const [products] = useState([
        { id: 1, name: "Laptop", price: 500, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Textbooks", price: 30, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Headphones", price: 80, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Headphones", price: 80, image: "https://via.placeholder.com/150" },
    ]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">Available Products</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                        <img className="w-full h-40 object-cover rounded" src={product.image} alt={product.name} />
                        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <Link to={`/product/${product.id}`} className="block mt-3 bg-green-500 text-white text-center py-2 rounded hover:bg-green-700">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Buy;
