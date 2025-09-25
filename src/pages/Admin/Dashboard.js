import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
const AdminDashboard = () => {
  const { orders, products, users, navigate } = useApp();
  
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalCustomers = users.filter(user => user.role === 'customer').length;

  useEffect(() => {
    // Create chart after component mounts
    const ctx = document.getElementById('salesChart');
    if (ctx && window.Chart) {
      // Destroy existing chart if it exists
      const existingChart = window.Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
      
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales',
            data: [1200, 1900, 3000, 5000, 2000, 3000],
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalCustomers}</div>
          <div className="stat-label">Customers</div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Sales Overview</h3>
        <canvas id="salesChart"></canvas>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-24)'}}>
        <div className="card">
          <div className="card__body">
            <h3>Recent Orders</h3>
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="order-item">
                <div>
                  <div>{order.id}</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                </div>
                <div className={`status status--${order.status === 'delivered' ? 'success' : 'warning'}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__body">
            <h3>Quick Actions</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-8)'}}>
              <button 
                className="btn btn--outline"
                onClick={() => navigate('/admin/products')}
              >
                Manage Products
              </button>
              <button 
                className="btn btn--outline"
                onClick={() => navigate('/admin/orders')}
              >
                Manage Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;