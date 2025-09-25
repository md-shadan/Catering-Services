import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Products Service
export const productService = {
  // Get all products
  async getAllProducts() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'products'), where('isActive', '==', true))
      );
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(productId) {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Add new product (Admin only)
  async addProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product (Admin only)
  async updateProduct(productId, updates) {
    try {
      const docRef = doc(db, 'products', productId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
 
  // Delete product (Admin only)
  async deleteProduct(productId) {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Orders Service
export const orderService = {
  // Create new order
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
    return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('orderDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const docRef = doc(db, 'orders', orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status (Admin)
  async updateOrderStatus(orderId, status) {
    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, {
        status: status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get all orders (Admin)
  async getAllOrders() {
    try {
      const q = query(collection(db, 'orders'), orderBy('orderDate', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};

// Users Service
export const userService = {
  // Create user profile
  async createUserProfile(userId, userData) {
    try {
      await setDoc(doc(db, 'users', userId), {
        uid: userId,
        ...userData,
        role: 'customer',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(uid) {
    try {
      const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Get all users (Admin)
  async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};
