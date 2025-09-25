import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { products, categories = [] } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch && product.isActive;
  });

  return (
    <div>
      <div className="products-header">
        <div className="products-filters">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="loading">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
