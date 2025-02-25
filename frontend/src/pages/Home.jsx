import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";


function Home() {
  return (
    <div className="app-content">
      <Navbar />
      
      {/* Carousel Section */}
      <Carousel />
      {/* Featured Products Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Featured Products</h1>
        <ProductList />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
