import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'

function LogIn( {setIsAuthenticated} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //state hooks
  let navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}login`, {
        email,
        password
    });

      //handle the response
      console.log("Authentication Successful", response.data);
      setIsAuthenticated(true);
      navigate("/example-App");
      // Redirect the user or save the Authentication token here
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">Email:</label>
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
          <button className="button" type="submit">Log In</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}

export default LogIn;
