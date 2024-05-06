import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AxiosInterceptor({ setIsLoggedIn }) {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    setIsLoggedIn(false);
                    localStorage.removeItem('authToken');
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate, setIsLoggedIn]);

    return null;
}
export default AxiosInterceptor;