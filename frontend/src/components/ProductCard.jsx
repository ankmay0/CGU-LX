import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700">Price: ₹{product.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">View Details</button>
        </div>
    );
};

export default ProductCard;
