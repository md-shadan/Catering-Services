import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const ProductDetailPage = () => {
  const { products, addToCart, user, navigate, currentPath } = useApp();
  const productId = currentPath.split("/")[2]; // keep as string, not parseInt
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  // console.log("user:", user);

  if (!product) {
    return <div className="loading">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    addToCart({ ...product, quantity }); // send product with quantity
    navigate("/cart");
  };

  return (
    <div>
      <button
        className="btn btn--outline mb-8"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={product.name}
            className="detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-rating mb-8">⭐ {product.rating} rating</div>
          <p>{product.description}</p>
          <div className="product-detail-price">₹{product.price}</div>

          <div className="stock-status">
            <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          {user && user.role === "customer" && product.stock > 0 && (
            <>
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min="1"
                    max={product.stock}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn btn--primary btn--lg btn--full-width"
                onClick={handleAddToCart}
              >
                Add to Cart - ₹{(product.price * quantity).toFixed(2)}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .product-detail {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .product-detail-image {
          flex: 1 1 380px;
          max-width: 480px;
          min-width: 320px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7fafc;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 24px;
        }
        .detail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          background: #e2e8f0;
        }
        @media (max-width: 900px) {
          .product-detail {
            flex-direction: column;
            gap: 24px;
          }
          .product-detail-image {
            max-width: 100%;
            min-width: 0;
            padding: 12px;
          }
          .detail-image {
            height: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
