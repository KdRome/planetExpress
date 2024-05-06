// AddressBookForm.jsx
import React, { useState } from 'react';

const AddressBookForm = () => {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isEditMode, setIsEditMode] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Address Book</h2>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="addressLine1">
                Address Line 1:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="addressLine1"
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="addressLine2">
                Address Line 2:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="addressLine2"
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="city">
                City:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="state">
                State:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="zipCode">
                Zip Code:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="zipCode"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Save Address</button>
          </form>
        ) : (
          <div className="space-y-2">
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Address Line 1:</strong> {formData.addressLine1}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Address Line 2:</strong> {formData.addressLine2}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>City:</strong> {formData.city}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>State:</strong> {formData.state}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Zip Code:</strong> {formData.zipCode}</p>
            <button onClick={handleEdit} className="btn-secondary py-2 px-4 rounded-md border-2 border-gray-300 text-gray-800 hover:bg-gray-200">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBookForm;
