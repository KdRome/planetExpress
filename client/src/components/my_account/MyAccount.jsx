// MyAccount.jsx
import React from "react";
import UserInfoForm from "./UserInfoForm";
import PaymentMethodsForm from "./PaymentMethodsForm";
import AddressBookForm from "./AddressBookForm";
import OrderHistory from "./OrderHistory";

const MyAccount = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">My Account</h1>
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
