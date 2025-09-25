import React from "react";
import { useApp } from "../context/AppContext";

const Header = () => {
  const { cart, user, logout, currentPath, navigate } = useApp();
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav">
        <button 
          className="logo" 
          onClick={() => navigate('/')}
          style={{background: 'none', border: 'none', cursor: 'pointer'}}
        >
          Ambur Catering
        </button>
        
        <ul className="nav-links">
          <li>
            <button
              className={currentPath === '/' ? 'active' : ''}
              onClick={() => navigate('/')}
              style={{background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-12)', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)'}}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={currentPath === '/products' ? 'active' : ''}
              onClick={() => navigate('/products')}
              style={{background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-12)', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)'}}
            >
              Products
            </button>
          </li>
          {user && user.role === 'customer' && (
            <li>
              <button
                className={currentPath === '/orders' ? 'active' : ''}
                onClick={() => navigate('/orders')}
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-12)', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)'}}
              >
                My Orders
              </button>
            </li>
          )}
          {user && user.role === 'admin' && (
            <li>
              <button
                className={currentPath.startsWith('/admin') ? 'active' : ''}
                onClick={() => navigate('/admin')}
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-12)', borderRadius: 'var(--radius-base)', transition: 'all var(--duration-fast) var(--ease-standard)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)'}}
              >
                Admin
              </button>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {user && user.role === 'customer' && (
            <div 
              className="cart-icon"
              onClick={() => navigate('/cart')}
            >
              🛒
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
          )}
          
          {user ? (
            <div className="flex items-center gap-12">
              <span>Welcome, {user.name}</span>
              <button className="btn btn--outline btn--sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="btn btn--primary btn--sm"
              onClick={() => navigate('/auth')}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;