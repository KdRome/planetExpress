// OrderHistory.jsx
import React, { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isEditMode, setIsEditMode] = useState(true);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Function to fetch order history from the database
  const fetchOrderHistory = () => {
    // Fetch order history from the database
    // Example:
    // fetch('/api/orders')
    //   .then(response => response.json())
    //   .then(data => setOrders(data));
  };

  // Fetch order history when component mounts
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Order History</h2>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <div className="space-y-2">
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  {/* Display order details */}
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
