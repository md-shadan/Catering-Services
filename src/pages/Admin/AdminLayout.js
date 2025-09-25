import React from "react";
import { useApp } from "../../context/AppContext";
const AdminLayout = ({ children }) => {
  const { currentPath, navigate } = useApp();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3 style={{marginBottom: 'var(--space-24)', color: 'var(--color-primary)'}}>
          Admin Panel
        </h3>
        <ul className="admin-nav">
          <li>
            <button
              className={currentPath === '/admin' ? 'active' : ''}
              onClick={() => navigate('/admin')}
              style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 'var(--space-12) var(--space-16)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', width: '100%', textAlign: 'left'}}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={currentPath === '/admin/products' ? 'active' : ''}
              onClick={() => navigate('/admin/products')}
              style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 'var(--space-12) var(--space-16)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', width: '100%', textAlign: 'left'}}
            >
              Products
            </button>
          </li>
          <li>
            <button
              className={currentPath === '/admin/orders' ? 'active' : ''}
              onClick={() => navigate('/admin/orders')}
              style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 'var(--space-12) var(--space-16)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', width: '100%', textAlign: 'left'}}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/')}
              style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 'var(--space-12) var(--space-16)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', width: '100%', textAlign: 'left'}}
            >
              ← Back to Store
            </button>
          </li>
        </ul>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;