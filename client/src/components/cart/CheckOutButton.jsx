import React from "react";
import axios from "axios";

function CheckOutButton() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleCheckOut = async () => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (!cart || cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}checkout`, {
                cart: cart
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            console.log('Checkout successful', response.data);
            alert("Checkout successful!"); // Feedback to user
            // Redirect to confirmation page
            
        } catch (error) {
            console.error('Error during checkout:', error.response?.data || error.message);
            alert("Error during checkout: " + (error.response?.data.message || "Please try again later."));
        }
        
    };

    return (
        <button
            type="button"
            className="washed-gray-bg hover:bg-gray-700 text-white font-bold py-2 px-4 mb-8 w-48 mt-8"
            onClick={() => handleCheckOut()}
        >
            Checkout
        </button>
    );
}

export default CheckOutButton;