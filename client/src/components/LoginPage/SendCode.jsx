import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LogIn.module.css';

function SendCode() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [notif, setNotif] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}sendCode`, {
                email,
            });

            //handle the response
            console.log("Send Code button clicked");
            setNotif("If your email is registered, you will receive a reset code.");
            navigate("/forgotPassword");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                //alert('Email already exists. Please use a different email.');
                setNotif("If your email is registered, you will receive a reset code.");
            }
            console.error(err);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2>Send Code</h2>
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
                    <div className={styles.sendCode}>
                        <Link to="/forgotPassword" type="submit" onClick={handleSubmit}>Send Code</Link>
                    </div>
                </form>
                {notif && <p className={styles.notifMessage}>{notif}</p>}
            </div>
        </div>
    );
}

export default SendCode;
