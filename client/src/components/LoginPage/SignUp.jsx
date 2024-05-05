import React, { useState } from 'react';
import axios from 'axios';
import styles from './LogIn.module.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [notif, setNotif] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple front-end validation
        if (!email || !password || !firstName || !lastName) {
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
            setNotif("Please input the code from your email");
            setShowVerificationInput(true);

            await axios.post(`${apiUrl}sendCode`, { email });
            //redirect the user here or next steps
        } catch (err) {
            if (err.response && err.response.status === 409) {
                //alert('Email already exists. Please use a different email.');
                setError("Email already exists. Please try again.");
            }
            else {
                setError("Account creation failed. Please try again.");
                console.error(err);
            }
        }
    };

    const handleEmailVerification = async (e) => {
        e.preventDefault();

        if (!code) {
            setError("Please input the code from email");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}emailVerification`, {
                email,
                code
            });
        } catch (err) {
            setError("Code verificaiton failed. Please try again");
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2>Sign Up</h2>
                <form onSubmit={showVerificationInput ? handleEmailVerification : handleSubmit}>
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
                        <label>Password:</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>First Name:</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Last Name:</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    {showVerificationInput ? (
                        <>
                            <div className={styles.formGroup}>
                                <label>Code:</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <button className={styles.button}>Verify Code</button>
                        </>
                    ) : (
                            <button className={styles.button}>Sign Up</button>
                        )}
                </form>
                {notif && <p className={styles.notifMessage}>{notif}</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );
}

export default SignUp;
