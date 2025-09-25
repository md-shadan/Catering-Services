import React from "react";
import { useApp } from "../context/AppContext";

const OrderTrackingPage = () => {
  const { orders, currentPath, orderStatuses = [
    { status: "ordered", label: "Ordered", description: "Your order has been placed" },
    { status: "preparing", label: "Preparing", description: "Your food is being prepared" },
    { status: "ready", label: "Ready", description: "Your food is ready for pickup/delivery" },
    { status: "delivered", label: "Delivered", description: "Your order has been delivered" },
  ] } = useApp();

  const orderId = currentPath.split("/")[2];
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return <div className="loading">Order not found</div>;
  }

  const currentStatusIndex = orderStatuses.findIndex(
    (s) => s.status === order.status
  );
  const progressPercentage =
    ((currentStatusIndex + 1) / orderStatuses.length) * 100;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Track Order {order.id}</h2>

      <div className="card">
        <div className="card__body">
          <div className="tracking-progress">
            <div className="progress-steps">
              <div
                className="progress-line"
                style={{ width: `${Math.max(0, progressPercentage - 25)}%` }}
              ></div>
              {orderStatuses.map((status, index) => (
                <div key={status.status} className="progress-step">
                  <div
                    className={`step-circle ${
                      index <= currentStatusIndex
                        ? "completed"
                        : index === currentStatusIndex + 1
                        ? "active"
                        : ""
                    }`}
                  >
                    {index <= currentStatusIndex ? "✓" : index + 1}
                  </div>
                  <div className="step-label">{status.label}</div>
                  <div className="step-description">{status.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "var(--space-32)" }}>
            <h4>Order Details</h4>
            <p>
              <strong>Order Date:</strong>{" "}
              {order.orderDate?.toDate
                ? order.orderDate.toDate().toLocaleString()
                : new Date(order.orderDate).toLocaleString()}
            </p>
            <p>
              <strong>Delivery Address:</strong> {order.shippingAddress}
            </p>
            {order.deliveryDate && (
              <p>
                <strong>Delivered:</strong>{" "}
                {order.deliveryDate?.toDate
                  ? order.deliveryDate.toDate().toLocaleString()
                  : new Date(order.deliveryDate).toLocaleString()}
              </p>
            )}

            <div className="order-items" style={{ marginTop: "var(--space-16)" }}>
              <h4>Items Ordered</h4>
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
