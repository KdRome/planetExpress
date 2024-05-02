// MyAccount.jsx
import React from "react";
import UserInfo from "./UserInfo";
import PaymentMethods from "./PaymentMethods";
import AddressBook from "./AddressBook";
import OrderHistory from "./OrderHistory";

const MyAccount = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">My Account</h1>
      <UserInfo />
      <PaymentMethods />
      <AddressBook />
      <OrderHistory />
    </div>
  );
};

export default MyAccount;
