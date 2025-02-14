import { useState } from "react";

const Sell = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Submitted:", product);
        // Here you can add logic to send product data to a backend API
        alert("Product listed successfully!");
        setProduct({ name: "", price: "", description: "", image: "" });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">Sell Your Item</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg mt-5">
                
                <label className="block mb-2 font-semibold">Product Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={product.name} 
                    onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded" 
                    required 
                />

                <label className="block mt-4 mb-2 font-semibold">Price ($):</label>
                <input 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded" 
                    required 
                />

                <label className="block mt-4 mb-2 font-semibold">Description:</label>
                <textarea 
                    name="description" 
                    value={product.description} 
                    onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded" 
                    required 
                ></textarea>

                <label className="block mt-4 mb-2 font-semibold">Image URL:</label>
                <input 
                    type="text" 
                    name="image" 
                    value={product.image} 
                    onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded" 
                />

                <button type="submit" className="mt-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                    List Product
                </button>
            </form>
        </div>
    );
};

export default Sell;
