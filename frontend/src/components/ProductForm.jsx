import { useState } from "react";

const ProductForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.imageUrl) {
            alert("Please fill in all required fields.");
            return;
        }
        onSubmit(formData);
        setFormData({ title: "", description: "", price: "", imageUrl: "" });
    };

    return (
        <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4">Add a Product</h2>

            <input 
                type="text" 
                name="title" 
                placeholder="Product Title" 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mb-2" 
                required 
            />

            <textarea 
                name="description" 
                placeholder="Product Description (Optional)" 
                value={formData.description} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mb-2"
            />

            <input 
                type="number" 
                name="price" 
                placeholder="Price (₹)" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mb-2" 
                required 
            />

            <input 
                type="text" 
                name="imageUrl" 
                placeholder="Image URL" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mb-2" 
                required 
            />

            <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full">
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
