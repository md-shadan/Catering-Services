import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { productService } from "../../services/firebaseService";

const ProductForm = ({ productId }) => {
  const { addProduct, updateProduct, navigate, products } = useApp();
  const isEdit = !!productId;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "", 
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  // Load product data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        setLoading(true);
        let product = products.find((p) => p.id === productId);
        if (!product) {
          // fallback: fetch from Firestore if not in state
          product = await productService.getProductById(productId);
        }
        if (product) {
          setForm({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            category: product.category || "",
            imageUrl: product.imageUrl || "", 
            isActive: product.isActive !== undefined ? product.isActive : true,
          });
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [isEdit, productId, products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEdit) {
      await updateProduct(productId, {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      });
      navigate("/admin/products");
    } else {
      await addProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      });
      navigate("/admin/products");
    }
    setLoading(false);
  };

  return (
    <div className="product-form-container">
      <form className="product-form card" onSubmit={handleSubmit}>
        <h2 className="form-title">{isEdit ? "Edit Product" : "Add New Product"}</h2>
        <div className="form-group">
          <label htmlFor="name">
            <span className="form-label">Product Name</span>
            <input
              id="name"
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              autoFocus
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <span className="form-label">Description</span>
            <textarea
              id="description"
              name="description"
              className="form-input"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows={3}
            />
          </label>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              <span className="form-label">Price (₹)</span>
              <input
                id="price"
                name="price"
                type="number"
                className="form-input"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="stock">
              <span className="form-label">Stock</span>
              <input
                id="stock"
                name="stock"
                type="number"
                className="form-input"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category">
            <span className="form-label">Category</span>
            <input
              id="category"
              name="category"
              className="form-input"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Snacks, Drinks"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">
            <span className="form-label">Image URL</span>
            <input
              id="imageUrl"
              name="imageUrl"
              className="form-input"
              value={form.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </label>
        </div>
        <div className="form-group form-checkbox">
          <label htmlFor="isActive">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="form-label">Active</span>
          </label>
        </div>
        <button type="submit" className="btn btn--primary btn-block" disabled={loading}>
          {isEdit ? "Update Product" : "Save Product"}
        </button>
      </form>
      <style>{`
        .product-form-container {
          max-width: 480px;
          margin: 40px auto;
          padding: 16px;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 32px 24px;
        }
        .form-title {
          text-align: center;
          margin-bottom: 24px;
          color: #2d3748;
        }
        .form-group {
          margin-bottom: 18px;
        }
        .form-row {
          display: flex;
          gap: 16px;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 1rem;
          margin-top: 6px;
          background: #f9fafb;
          transition: border 0.2s;
        }
        .form-input:focus {
          border-color: #3182ce;
          outline: none;
        }
        .form-label {
          font-weight: 500;
          color: #4a5568;
        }
        .form-checkbox {
          display: flex;
          align-items: center;
        }
        .form-checkbox input[type="checkbox"] {
          margin-right: 8px;
        }
        .btn-block {
          width: 100%;
          padding: 12px 0;
          font-size: 1.1rem;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default ProductForm;
