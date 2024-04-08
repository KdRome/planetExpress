import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LogIn.css'
import './ForgotPassword.jsx'

function SendCode({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}sendCode`,{
                email
            });

            //handle the response
            console.log("Send Code button clicked");

        } catch (err) {
            setError("Cant Send Code. Please check your credentials.");
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
                        <Link to="/ForgotPassword" onClick={handleSubmit}>Send Code</Link>
                    </div>
                </form>
                {error && <p className="errorMessage">{error}</p>}
            </div>
        </div>
    );
}

export default SendCode;