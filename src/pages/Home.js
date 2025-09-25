import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { products, navigate } = useApp();
  const featuredProducts = products.slice(0, 6);

  return (
    <div>
      <section className="hero">
        <h1>Welcome to Ambur Catering</h1>
        <p>Delicious, fresh food delivered right to your workplace. Order now and satisfy your cravings!</p>
        <button 
          className="btn btn--primary btn--lg"
          onClick={() => navigate('/products')}
        >
          Browse Menu
        </button>
      </section>

      <section>
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};


export default HomePage;