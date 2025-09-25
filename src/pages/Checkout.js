import React, { useState } from "react";
import { useApp } from "../context/AppContext";
const CheckoutPage = () => {
  const { cart, user, placeOrder, navigate } = useApp();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!shippingAddress.trim()) {
    alert('Please enter a delivery address');
    return;
  }

  setLoading(true);
  const orderId = await placeOrder(shippingAddress);
  setLoading(false);
  if (orderId) {
    navigate(`/track/${orderId}`);
  } else {
    alert("Order failed. Please try again.");
  }
};

  return (
    <div style={{maxWidth: '600px', margin: '0 auto'}}>
      <h2>Checkout</h2>
      
      <div className="card">
        <div className="card__body">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="form-group">
          <label className="form-label">Delivery Address</label>
          <textarea
            className="form-control"
            placeholder="Enter your delivery address (room number, building, etc.)"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows="3"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn--primary btn--full-width btn--lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="spinner"></div>
              Processing Order...
            </span>
          ) : (
            `Place Order - $${total.toFixed(2)}`
          )}
        </button>
      </form>
    </div>
  );
};
export default CheckoutPage;