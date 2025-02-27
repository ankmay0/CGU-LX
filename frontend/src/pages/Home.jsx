import React from "react";
import ProductList from "../components/ProductList";
import Carousel from "../components/Carousel";

const products = [
  { id: 1, name: "Laptop", price: 50000, image: "/laptop.jpg" },
  { id: 2, name: "Smartphone", price: 30000, image: "/smartphone.jpg" },
  { id: 3, name: "Headphones", price: 2000, image: "/headphones.jpg" },
];

function Home() {
  return (
    <div className="app-content">
      {/* Carousel Section */}
      <Carousel />

      {/* Featured Products Section */}
      <div>
          <ProductList products={products} />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Featured Products</h1>
      </div>
    </div>
  );
}

export default Home;
