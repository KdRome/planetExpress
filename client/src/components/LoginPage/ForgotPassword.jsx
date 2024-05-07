import React, { useState } from 'react';
import axios from 'axios';
import styles from './LogIn.module.css';

function ForgotPassword({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [notif, setNotif] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setError("The passwords do not match. Please try again.");
        }

        try {
            const response = await axios.post(`${apiUrl}forgotPassword`, {
                email,
                code,
                password
            });

            //handle the response
            setNotif("Password Updated.");

        } catch (err) {
            setError("Password reset failed. Please check your email.");
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2>Password Reset</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Code:</label>
                        <input
                            className={styles.input}
                            type="auth_code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>New Password:</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Re-Enter New Password:</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit" onClick={handleForgotPassword}>Reset Password</button>
                    {notif && <p className={styles.notifMessage}>{notif}</p>}
                </form>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
