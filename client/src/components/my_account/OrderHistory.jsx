// OrderHistory.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isEditMode, setIsEditMode] = useState(true);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Function to fetch order history from the database
  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setOrders(response.data.orders);
      console.log(response.data);
    } catch (error) {
      console.error("Problem with API", error);
    }
  };

  // Fetch order history when component mounts
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Order History</h2>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="border-b last:border-b-0 py-2">
                  <div className="flex justify-between items-center">
                    <span>Total: ${parseFloat(order.total_price).toFixed(2)}</span>
                    <span>Ordered On: {format(new Date(order.created_at), 'PPP')}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
          {!isEditMode && (
            <button onClick={handleEdit} className="btn-secondary py-2 px-4 rounded-md border-2 border-gray-300 text-gray-800 hover:bg-gray-200">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
