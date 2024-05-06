// UserInfoForm.jsx
import React, { useState } from 'react';

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Add more fields as needed
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
      <h2 className="text-2xl font-semibold mb-4 text-center">User Information</h2>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="name">
                Name:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="email">
                Email:
              </label>
              <input
                className="form-input border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Add more form fields as needed */}
            <button type="submit" className="btn-primary py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Save Changes</button>
          </form>
        ) : (
          <div className="space-y-2">
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Name:</strong> {formData.name}</p>
            <p className={isSaved ? 'text-lg font-semibold' : ''}><strong>Email:</strong> {formData.email}</p>
            {/* Display more fields as needed */}
            <button onClick={handleEdit} className="btn-secondary py-2 px-4 rounded-md border-2 border-gray-300 text-gray-800 hover:bg-gray-200">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;
