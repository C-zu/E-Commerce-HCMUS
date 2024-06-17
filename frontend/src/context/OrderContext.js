import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  // Order state
  const [orders, setOrders] = useState([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://m8mp78nj-8000.asse.devtunnels.ms/api/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Add order
  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post('https://m8mp78nj-8000.asse.devtunnels.ms/api/orders/', newOrder);
      setOrders([...orders, newOrder]);
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order');
    }
  };


  
  // Update order
  const updateOrder = async (order_id, updatedData) => {
    try {
      const response = await axios.put(`https://m8mp78nj-8000.asse.devtunnels.ms/api/orders/${order_id}`, updatedData);
      setOrders(orders.map(order => (order.order_id === order_id ? updatedData : order)));
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  // Delete order
  const deleteOrder = async (order_id) => {
    try {
      await axios.delete(`https://m8mp78nj-8000.asse.devtunnels.ms/api/orders/${order_id}`);
      setOrders(orders.filter(order => order.order_id !== order_id));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

  // Find order by ID
  const findOrderById = (order_id) => {
    return orders.find(order => order.order_id === order_id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder, findOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
