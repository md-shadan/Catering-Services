import React from "react";
import { useApp } from "../context/AppContext";
const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, user, navigate } = useApp();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="loading">
        <div>
          <h2>Your cart is empty</h2>
          <button 
            className="btn btn--primary mt-8"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-32)'}}>
      <div>
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cart.map(item => (
            <div key={`${item.id}-${item.name}`} className="cart-item">
              <div className="cart-item-image">Image</div>
              <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span style={{padding: 'var(--space-8) var(--space-12)'}}>{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="btn btn--outline btn--sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="cart-total">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button 
          className="btn btn--primary btn--full-width btn--lg"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;