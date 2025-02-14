import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">Seller: {product.sellerName}</p>
            
            <Link to={`/product/${product.id}`}>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                    View Details
                </button>
            </Link>
        </div>
    );
};

export default ProductCard;
