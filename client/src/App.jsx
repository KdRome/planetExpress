import React, { useState, createContext } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import CategoryDescription from "./components/product-grid/CategoryDescription";
import ProductGrid from "./components/product-grid/ProductGrid";
import Footer from "./components/Footer";
import Cart from "./components/cart/Cart";
import ProductPage from "./components/product-page/ProductPage";
import Login from "./components/LoginPage/LogIn";
import SendCode from "./components/LoginPage/SendCode";
import SignUp from "./components/LoginPage/SignUp";

// NavBar Icons
import { BsGpuCard, BsMotherboard } from "react-icons/bs";
import { RiRam2Line, RiCpuLine } from "react-icons/ri";  
import ForgotPassword from "./components/LoginPage/ForgotPassword";

export const Context = createContext();

function App() {
    const [cartCounter, setCartCounter] = useState(0);
    const navigationItems = [
        { name: "CPU", icon: RiCpuLine },
        { name: "GPU", icon: BsGpuCard },
        { name: "RAM", icon: RiRam2Line },
        { name: "Motherboard", icon: BsMotherboard },
    ];

    return (
        <Context.Provider value={[cartCounter, setCartCounter]}>
            <AnnouncementBar title="Free Shipping on Earth" />
            <Header navigationItems={navigationItems} />

            <Router>
                <Routes>
                    <Route path="/account" element={<Login />} />
                    <Route path="/sendCode" element={<SendCode />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />

                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <CategoryDescription
                                    desc="Discover the cutting-edge technology that powers modern computing. 
                                    Browse our carefully selected range of high-speed CPUs, GPUs, RAM, and motherboards to assemble your ideal personal computer. 
                                    Start shopping now to build the perfect PC with premium components from trusted brands."
                                    title="Products"
                                />
                                <ProductGrid />
                            </>
                        }
                    />
                    <Route
                        path="/cpu"
                        element={
                            <>
                                <CategoryDescription
                                    title="CPU's"
                                    desc="Explore our complete collection of CPUs, where performance meets efficiency. 
                                    We offer a diverse selection of processors to suit every need, from high-speed gaming to intensive multitasking. 
                                    Choose from industry-leading brands and unlock the full potential of your custom-built PC. 
                                    Start shopping now to find the perfect CPU for your setup."
                                />
                                <ProductGrid category="Processor" />
                            </>
                        }
                    />
                    <Route
                        path="/gpu"
                        element={
                            <>
                                <CategoryDescription
                                    title="GPU's"
                                    desc="Experience the artistry behind every GPU. 
                                    Experts carefully craft each unit with precision, from initial design to final assembly, ensuring peak performance and reliability.  
                                    Discover GPUs that deliver exceptional power without compromising on sustainability."
                                />
                                <ProductGrid category="Graphics Card" />
                            </>
                        }
                    />
                    <Route
                        path="/ram"
                        element={
                            <>
                                <CategoryDescription
                                    title="RAM"
                                    desc="Explore our exceptional selection of RAM, where craftsmanship meets performance. 
                                    Each module is carefully selected for quality and versatility, using premium materials to deliver reliable memory solutions. 
                                    Whether you're enhancing productivity or optimizing gaming, our RAM is designed to take your workflow to new heights. 
                                    Discover memory that blends elegance with power."
                                />
                                <ProductGrid category="RAM" />
                            </>
                        }
                    />
                    <Route
                        path="/motherboard"
                        element={
                            <>
                                <CategoryDescription
                                    title="Motherboards"
                                    desc="Explore our impressive range of motherboards, where quality meets versatility.
                                    Designed to enhance your computing experience, these motherboards offer a perfect blend of style and functionality. 
                                    Elevate your setup with motherboards that are tailored to meet your needs, whether you're a gamer, a developer, or a general PC enthusiast."
                                />
                                <ProductGrid category="Motherboard" />
                            </>
                        }
                    />
                    <Route path="/products/:id" element={<ProductPage />} />
                </Routes>
            </Router>
            <Footer />
        </Context.Provider>
    );
}

export default App;