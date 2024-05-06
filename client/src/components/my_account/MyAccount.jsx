// MyAccount.jsx
import React from "react";
import UserInfoForm from "./UserInfoForm";
import PaymentMethodsForm from "./PaymentMethodsForm";
import AddressBookForm from "./AddressBookForm";
import OrderHistory from "./OrderHistory";
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-semibold mb-8 text-center">My Account</h1>
        <button
          type="button"
          className="washed-gray-bg hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8 w-48 mt-8"
          onClick={() => handleLogOut()}
        >
          Sign Out
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <UserInfoForm />
        <PaymentMethodsForm />
        <AddressBookForm />
        <OrderHistory />
      </div>
    </div>
  );
};

export default MyAccount;
