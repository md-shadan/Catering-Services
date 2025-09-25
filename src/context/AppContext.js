import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { authService } from "../services/authService";
import {
  productService,
  orderService,
  userService,
} from "../services/firebaseService";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([
    {
      status: "ordered",
      label: "Ordered",
      description: "We received your order",
    },
    {
      status: "preparing",
      label: "Preparing",
      description: "Your order is being prepared",
    },
    {
      status: "ready",
      label: "Ready",
      description: "Your order is ready for pickup",
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Order delivered successfully",
    },
  ]);
  const [users, setUsers] = useState([]);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);

  // Navigation
  const navigate = useCallback((path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  // Auth
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await userService.getUserProfile(firebaseUser.uid);
        setUser({
          ...profile,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const user = await authService.login(email, password);
      // setUser(user);
      const profile = await userService.getUserProfile(user.uid);
      setUser({ ...user, ...profile });
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const register = async (email, password, name) => {
    try {
      const user = await authService.register(email, password, name);
      setUser(user);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
  };

  // Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const addProduct = async (productData) => {
    const id = await productService.addProduct(productData);
    setProducts((prev) => [...prev, { ...productData, id }]);
  };

  // Orders
  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        try {
          if (user.role === "admin") {
            // Load all orders for admin
            const allOrders = await orderService.getAllOrders();
            setOrders(allOrders);
          } else {
            // Load only user's orders
            const ordersData = await orderService.getUserOrders(user.uid);
            setOrders(ordersData);
          }
        } catch (error) {
          console.error("Error loading orders:", error);
        }
      } else {
        setOrders([]); // Clear orders on logout
      }
    };
    loadOrders();
  }, [user]);

  const placeOrder = async (shippingAddress) => {
    if (!user) {
      alert("Login required");
      return;
    }
    const newOrder = {
      userId: user.uid,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      status: "ordered",
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      shippingAddress,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    try {
      const orderId = await orderService.createOrder(newOrder);
      setOrders((prev) => [...prev, { id: orderId, ...newOrder }]);
      setCart([]);
      return orderId;
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                deliveryDate:
                  newStatus === "delivered"
                    ? new Date().toISOString()
                    : order.deliveryDate,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Update status failed", error);
    }
  };

  // Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateProduct = async (productId, updates) => {
    await productService.updateProduct(productId, updates);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  useEffect(() => {
    const loadUsers = async () => {
      if (user && user.role === "admin") {
        try {
          const usersData = await userService.getAllUsers();
          setUsers(usersData);
        } catch (error) {
          console.error("Error loading users:", error);
        }
      } else {
        setUsers([]);
      }
    };
    loadUsers();
  }, [user]);

  const value = {
    user,
    products,
    orders,
    cart,
    categories,
    orderStatuses,
    users,
    currentPath,
    loading,
    login,
    register,
    logout,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    placeOrder,
    updateOrderStatus,
    deleteProduct,
    navigate,
    addProduct,
    updateProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
