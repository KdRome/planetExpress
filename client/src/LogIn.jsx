import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
  );
}

export default LogIn;
