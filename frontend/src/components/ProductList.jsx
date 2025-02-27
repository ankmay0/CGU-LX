import React from "react";
import ProductCard from "./ProductCard"; // Ensure the path is correct

const ProductList = ({ products = [] }) => {
    return (
        <div className="container mx-auto p-4">

            {products.length === 0 ? (
                <p className="text-gray-500 text-center">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
