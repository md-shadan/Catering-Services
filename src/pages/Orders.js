import React from "react";
import { useApp } from "../context/AppContext";

const OrdersPage = () => {
  const { orders, user, navigate } = useApp();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const userOrders = orders.filter((order) => order.userId === user.uid);


  if (userOrders.length === 0) {
    return (
      <div className="loading">
        <div>
          <h2>No orders yet</h2>
          <button 
            className="btn btn--primary mt-8"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Order History</h2>
      <div className="order-list">
        {userOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-id">Order {order.id}</div>
                <div className="order-date">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </div>
              <div className={`status status--${order.status === 'delivered' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <span>Total:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            
            <div style={{display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-16)'}}>
              <button 
                className="btn btn--outline btn--sm"
                onClick={() => navigate(`/track/${order.id}`)}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;