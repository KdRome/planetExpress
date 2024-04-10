import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LogIn.css'
import './ForgotPassword.jsx'

function SendCode({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [notif, setNotif] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post(`${apiUrl}sendCode`,{
              email,
          });

            //handle the response
            console.log("Send Code button clicked");
            setNotif("If your email is registered, you will receive a reset code.");
            navigate("/ForgotPassword");
        } catch (err) {
            setError("If your email is registered, you will receive a reset code.");
            console.error(err);
        }
    }

    return (
        <div className="container">
            <div className="formWrapper">
                <h2>Send Code</h2>
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
                    <div className="sendCode">
                        <Link to="/ForgotPassword" type="submit" onClick={handleSubmit}>Send Code</Link>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

export default SendCode;
