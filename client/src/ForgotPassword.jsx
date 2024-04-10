import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.css'

function ForgotPassword({setIsAuthenticated}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}forgotPassword`, {
                email,
                code,
                password
            });
            
            //handle the response
            
        } catch (err) {
            setError("Password reset failed. Please check your email.");
            console.error(err);
        }
    };

    return (
      <div className="container">
        <div className="formWrapper">
          <h2>Password Reset</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="formGroup">
              <label>Code:</label>
                <input
                  className="input"
                  type="auth_code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
            </div>
            <div className="formGroup">
              <label>New Password:</label>
                <input
                  className="input"
                  type="auth_code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
            </div>
            <div className="formGroup">
              <label>Re-Enter New Password:</label>
                <input
                  className="input"
                  type="auth_code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
            </div>
            <button className="button" type="submit" onClick={handleForgotPassword}>Reset Password</button>
          </form>
          {error && <p className="errorMessage">{error}</p>}
        </div>
      </div>
    );
}

export default ForgotPassword;