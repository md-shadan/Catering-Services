import React from 'react';
import { useApp } from './context/AppContext';

import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/ProductManagement';
import AdminOrders from './pages/Admin/OrderManagement';
import ProductForm from './pages/Admin/ProductForm';

import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/Orders';
import AuthPage from './pages/Auth';
import ProductDetailPage from './pages/ProductDetail';
import OrderTrackingPage from './pages/OrderTracking';

const AppRoutes = () => {
  const { user, currentPath, navigate } = useApp();


  // Guard: wait until currentPath is available
  if (!currentPath) {
    return <div className="loading">Loading...</div>;
  }

  // Admin routes
  if (currentPath.startsWith('/admin')) {
    if (!user || user.role !== 'admin') {
      return (
        <div className="loading">
          <div>
            <h2>Access Denied</h2>
            <p>Please login as an admin to access this area.</p>
            <button 
              className="btn btn--primary mt-8"
              onClick={() => navigate('/auth')}
            >
              Login
            </button>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith("/admin/product/") && currentPath !== "/admin/product/new") {
      const productId = currentPath.split("/")[3];
      return (
        <AdminLayout>
          <ProductForm productId={productId} />
        </AdminLayout>
      );
    }

    return (
      <AdminLayout>
        {currentPath === '/admin' && <AdminDashboard />}
        {currentPath === '/admin/products' && <AdminProducts />}
        {currentPath === '/admin/orders' && <AdminOrders />}
        {currentPath === '/admin/product/new' && <ProductForm />}
      </AdminLayout>
    );
  }

  // Customer routes
  switch (currentPath) {
    case '/':
      return <HomePage />;
    case '/products':
      return <ProductsPage />;
    case '/cart':
      return <CartPage />;
    case '/checkout':
      return <CheckoutPage />;
    case '/orders':
      return <OrdersPage />;
    case '/auth':
      return <AuthPage />;
    default:
      if (currentPath.startsWith('/product/')) {
        return <ProductDetailPage />;
      }
      if (currentPath.startsWith('/track/')) {
        return <OrderTrackingPage />;
      }
      return (
        <div className="loading">
          <h2>Page Not Found</h2>
          <button 
            className="btn btn--primary mt-8"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
        </div>
      );
  }
};
export default AppRoutes;