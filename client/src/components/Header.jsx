import React, { useState, useContext } from "react";
import { Context } from "../App.jsx";
import planetExpressLogo from '../assets/planet_express_logo.png'
import { BrowserRouter, NavLink } from "react-router-dom";
import { useEffect } from "react";

//Icon imports
import { CiSearch } from "react-icons/ci";
import { 
    MdAccountCircle,
    MdOutlineShoppingCart,
} from "react-icons/md";

function App({ navigationItems }) {
    // Sets state for mobile hamburger menu
    const [isOpen, setIsOpen] = useState(false);
    // Get cartCounter from useContext
    const [cartCounter, setCartCounter] = useContext(Context);

    useEffect(() => {
        // Calculates how many item quantities in cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let counter = 0;

        for (let x in cart) {
            counter += cart[x].quantity;
        }

        setCartCounter(counter);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            {/* Logo */}
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-9">
                <div className="">
                    <a href="/">
                        <img
                            src={planetExpressLogo}
                            className="w-16 h-16 mr-2"
                            alt="Logo"
                            width={145}
                            height={145}
                            onError={(e) => {
                                e.target.src = '../assets/planet_express_logo.png'
                            }}
                        />
                    </a>
                </div>
                {/* Mobile hamburger icon */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`fill-current h-6 w-6 ${
                                isOpen ? "hidden" : "block"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                        <svg
                            className={`fill-current h-6 w-6 ${
                                isOpen ? "block" : "hidden"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>

                {/* navigation links */}
                <div
                    className={`w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <nav className="text-sm flex flex-col lg:flex-row lg:mt-0 relative top-4 lg:top-1 lg:items-center">
                        <BrowserRouter>
                            <NavLink
                                reloadDocument
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "mb-4 lg:mb-0 lg:mx-3 lg:border-b lg:border-gray-700 lg:pb-1.5 relative top-1"
                                        : "mb-4 lg:mb-0 lg:mx-3"
                                }
                            >
                                Home
                            </NavLink>
                            {navigationItems.map((item) => (
                                <NavLink
                                    reloadDocument
                                    key={item.name}
                                    to={item.name.toLowerCase()}
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? "pending"
                                            : isActive
                                            ? "mb-4 lg:mb-0 lg:mx-3 lg:border-b lg:border-gray-700 lg:pb-1.5 relative top-1"
                                            : "mb-4 lg:mb-0 lg:mx-3"
                                    }
                                >   
                                    <div style={{ display: 'flex', alignItems: 'center' }}> {/* Makes sure tha icon and text are inline */}
                                        <item.icon style={{ marginRight: '0.5rem' }} />
                                        {item.name}
                                    </div>
                                </NavLink>
                            ))}

                            <NavLink
                                reloadDocument
                                to="cart"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                        ? "mb-4 lg:mb-0 lg:mx-3 lg:hidden"
                                        : "mb-4 lg:mb-0 lg:mx-3 lg:hidden"
                                }
                            >
                                Cart
                            </NavLink>
                        </BrowserRouter>
                    </nav>
                </div>

                {/* Right side cart, profile and search icons */}
                <div id="header-icons" className="hidden lg:flex">
                    <a
                        href="#"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <CiSearch style={{width: '25px', height: '25px'}} />
                    </a>

                    <a
                        href="/account"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <MdAccountCircle style={{width: '25px', height: '25px'}} />
                    </a>

                    <a
                        href="/cart"
                        className="px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                        <MdOutlineShoppingCart style={{width: '25px', height: '25px'}} />
                        <div className="absolute">
                            {cartCounter > 0 ? (
                                <span className="bg-white text-black border text-xs relative bottom-9 left-4 py-0.5 px-1.5 rounded-full">
                                    {cartCounter}
                                </span>
                            ) : (
                                <></>
                            )}
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}
export default App;