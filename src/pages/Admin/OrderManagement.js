import React from "react";
import { useApp } from "../../context/AppContext";
const AdminOrders = () => {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Orders</h2>
      </div>

      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-id">Order {order.id}</div>
                <div className="order-date">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>
                  Delivery: {order.shippingAddress}
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-8)'}}>
                <div className={`status status--${order.status === 'delivered' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
                <select 
                  className="form-control"
                  style={{minWidth: '150px'}}
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="ordered">Ordered</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AdminOrders;