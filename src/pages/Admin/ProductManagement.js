import React from "react";
import { useApp } from "../../context/AppContext";
const AdminProducts = () => {
  const { products, deleteProduct, navigate } = useApp();

  return (
    <div>
      <div className="admin-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24}}>
        <h2 style={{margin: 0}}>Manage Products</h2>
        <button 
          className="btn btn--primary"
          onClick={() => navigate('/admin/product/new')}
        >
          Add New Product
        </button>
      </div>

      <div className="products-grid-admin">
        {products.map(product => (
          <div key={product.id} className="admin-product-card">
            <div className="admin-product-image">
              <img
                src={product.imageUrl || "https://via.placeholder.com/220x160?text=No+Image"}
                alt={product.name}
              />
            </div>
            <div className="admin-product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">₹{product.price}</span>
                <span className={`status ${product.isActive ? 'status--success' : 'status--error'}`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="stock-status">
                Stock: <b>{product.stock}</b> units
              </div>
              <div style={{display: 'flex', gap: '12px', marginTop: '10px'}}>
                <button 
                  className="btn btn--outline btn--sm"
                  onClick={() => navigate(`/admin/product/${product.id}`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn--outline btn--sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product?')) {
                      deleteProduct(product.id);
                    }
                  }}
                  style={{color: "#e53e3e", borderColor: "#e53e3e"}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .products-grid-admin {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .admin-product-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 18px 18px 16px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.2s;
        }
        .admin-product-card:hover {
          box-shadow: 0 4px 24px rgba(49,130,206,0.13);
        }
        .admin-product-image {
          width: 100%;
          height: 160px;
          overflow: hidden;
          border-radius: 10px;
          background: #f3f3f3;
          margin-bottom: 10px;
        }
        .admin-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
        .admin-product-info {
          width: 100%;
        }
        .product-name {
          margin: 12px 0 6px 0;
          font-size: 1.1rem;
        }
        .product-description {
          font-size: 0.97rem;
          color: #555;
          margin: 0 0 8px 0;
        }
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-price {
          font-weight: 600;
          color: #3182ce;
        }
        .status--success {
          color: #38a169;
          font-weight: 500;
        }
        .status--error {
          color: #e53e3e;
          font-weight: 500;
        }
        .stock-status {
          font-size: 0.93rem;
          color: #666;
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
};

export default AdminProducts;