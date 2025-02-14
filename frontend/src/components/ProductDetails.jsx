import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <p className="text-red-500 text-center mt-10">Product not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-64 object-cover" src={product.image} alt={product.name} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-gray-600 mt-2">Price: <span className="text-green-600 font-semibold">${product.price}</span></p>
                    <p className="text-gray-700 mt-4">{product.description}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
