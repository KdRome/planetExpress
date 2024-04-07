import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.css'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if(!email || !password || !firstName || !lastName) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}create_user`, {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      console.log("Account creation successful", response.data);
      //redirect the user here or next steps
    } catch (err) {
      setError("Account creation failed. Please try again.");
      console.error(err);
    }
  };
  
  return (
    <div className="container">
      <div className="formWrapper">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Email:</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Password:</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>First Name:</label>
            <input
              className="input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Last Name:</label>
            <input
              className="input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">Sign Up</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
