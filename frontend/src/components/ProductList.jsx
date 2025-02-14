import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Available Products</h2>

            {products.length === 0 ? (
                <p className="text-gray-500">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
