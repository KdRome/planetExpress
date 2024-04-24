import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LogIn.css'
import './SendCode.jsx'

function LogIn( {setIsAuthenticated} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //state hooks
  let navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleForgottenPassword = () => {
  
    console.log("Forgot password button clicked");
    //navigate("/ForgotPassword");
  };

  // In LogIn.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${apiUrl}login`, {
      email,
      password
  });

    console.log("Authentication Successful", response.data);
    setIsAuthenticated(true);
    navigate("/main-page");  // Updated to /main-page
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
          <div className="forgotPassword">
            <Link to="/SendCode" onClick={handleForgottenPassword}>Forgot Password?</Link>
          </div>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}

export default LogIn;