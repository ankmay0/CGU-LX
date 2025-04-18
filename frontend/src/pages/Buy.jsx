import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Filter from "../components/Filter";
import AllProducts from "../components/AllProducts";

const Buy = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [filters, setFilters] = useState({
    locationType: "",
    condition: "",
    category: "",
    priceRange: "",
  });

  useEffect(() => {
    console.log("Filters updated:", filters);
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    if (selectedProduct) setCurrentImageIndex(0);
  }, [selectedProduct]);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchProducts = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    console.log("Fetching products with query:", queryParams.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/filter?${queryParams.toString()}`);
      const data = await response.json();
      console.log("Fetched Products:", data);

      if (data.success) {
        if (data.products.length === 0) {
          console.warn("No products found");
        }
        // Shuffle products before setting state
        const shuffledProducts = shuffleArray(data.products);
        setProducts(shuffledProducts);
      } else {
        setProducts([]);
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleProductClick = async (product) => {
    setSelectedProduct(product);
  
    try {
      await fetch(`${API_BASE_URL}/api/products/${product._id}/click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };
  
  const handleFilterChange = (newFilters) => {
    console.log("Filters received from Filter component:", newFilters);
    setFilters(newFilters);
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="mb-6">
        <Filter onFilterChange={handleFilterChange} />
      </div>
  
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-t-transparent border-green-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div
                  className="w-full h-40 sm:h-52 rounded-xl overflow-hidden relative"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {hoveredProduct === product._id ? (
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 1500 }}
                      loop
                      className="w-full h-full"
                    >
                      {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt={`${product.name} ${index}`}
                            className="w-full h-40 sm:h-52 object-cover rounded-xl transition-all duration-300"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 sm:h-52 object-cover rounded-xl transition-transform duration-300"
                    />
                  )}
                </div>
  
                <div className="mt-3 sm:mt-4 space-y-1">
                  <h3 className="text-md sm:text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="text-lg sm:text-xl font-bold text-green-700 block">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md inline-block">
                    ₹0 platform fee <span className="text-[10px]">EarlyBirdOffer</span>
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-80">
              <p className="text-gray-700 text-lg font-medium">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      )}
  
      {selectedProduct && (
        <AllProducts 
          product={{ ...selectedProduct, images: selectedProduct.images }} 
          onClose={() => setSelectedProduct(null)} 
          currentImageIndex={currentImageIndex} 
          nextImage={nextImage} 
          prevImage={prevImage} 
        />
      )}
    </div>
  );
  
};

export default Buy;
