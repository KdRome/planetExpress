import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LogIn.module.css';

function LogIn({ setIsLoggedIn }) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleForgottenPassword = () => {
    console.log("Forgot password button clicked");
  };

  const handleNewAccount = () => {
    console.log("New Account button clicked");
  };

  // In LogIn.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}login`, {
        email,
        password
      });
      if (response.data.access_token) {

        localStorage.setItem('authToken', response.data.access_token); // stores token in local storage
        console.log("Authentication Successful", response.data);
        localStorage.setItem('isLoggedIn', 'true'); // // stores status in local storage
        setIsLoggedIn(true);
        navigate("/account", { replace: true });
      } else {
        throw new Error("No Token received");
      }

    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
      console.error(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.button} type="submit">Log In</button>
          <div className={styles.forgotPassword}>
            <Link to="/sendCode" onClick={handleForgottenPassword}>Forgot Password?</Link>
          </div>
          <div className={styles.noAccount}>
            <Link to="/signUp" onClick={handleNewAccount}>No Account?</Link>
          </div>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}

export default LogIn;
