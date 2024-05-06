// PaymentMethodsForm.jsx
import React, { useState } from "react";

const PaymentMethodsForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isEditMode, setIsEditMode] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    setIsSaved(true);
    // Call API to save formData to the database
    console.log('Form data submitted:', formData);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsSaved(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment Methods</h2>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="cardNumber">
                Card Number:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="expiryDate">
                Expiry Date:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="expiryDate"
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="cvv">
                CVV:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="cvv"
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Save Payment Method</button>
          </form>
        ) : (
          <div className="space-y-2">
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Card Number:</strong> {formData.cardNumber}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Expiry Date:</strong> {formData.expiryDate}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>CVV:</strong> {formData.cvv}</p>
            <button onClick={handleEdit} className="btn-secondary py-2 px-4 rounded-md border-2 border-gray-300 text-gray-800 hover:bg-gray-200">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsForm;
