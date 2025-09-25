import React from "react";
import { useApp } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, user, navigate } = useApp();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img
        src={product.imageUrl || "https://via.placeholder.com/200x150?text=No+Image"}
        alt={product.name}
        className="product-card-image"
        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <div className="product-rating">
            ⭐ {product.rating}
          </div>
        </div>
        <div className="stock-status">
          <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        {user && user.role === 'customer' && (
          <button 
            className="btn btn--primary btn--full-width mt-8"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;