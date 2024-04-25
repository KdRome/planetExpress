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

// NavBar Icons
import { HiOutlineCpuChip } from "react-icons/hi2";
import {
    BsGpuCard,
    BsMotherboard,
} from "react-icons/bs";
import { RiRam2Line } from "react-icons/ri";  

export const Context = createContext();

function App() {
    const [cartCounter, setCartCounter] = useState(0);
    const navigationItems = [
        { name: "CPU", icon: HiOutlineCpuChip },
        { name: "GPU", icon: BsGpuCard },
        { name: "RAM", icon: RiRam2Line },
        { name: "Motherboard", icon: BsMotherboard },
    ];

    return (
        <Context.Provider value={[cartCounter, setCartCounter]}>
            <AnnouncementBar title="Free Shipping in United States" />
            <Header navigationItems={navigationItems} />

            <Router>
                <Routes>
                    <Route path="/account" element={<Login />}></Route>



                    <Route path="/cart" element={<Cart />}></Route>
                    <Route
                        path="/"
                        element={
                            <>
                                <CategoryDescription
                                    desc="Experience the latest in technology! Explore a curated collection of high speed 
                                    CPU's, GPU's, RAM and Motherboards for a complete personal computer. 
                                    Shop now and build your perfect personal computer"
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
                                    desc="Using mostly recycled fibers, we create sustainable shoes that combine comfort with timeless style. 
                                    Step into our shoes and experience the difference of artisanal craftsmanship and eco-conscious design."
                                />
                                <ProductGrid category="shoes" />
                            </>
                        }
                    />
                    <Route
                        path="/gpu"
                        element={
                            <>
                                <CategoryDescription
                                    title="GPU's"
                                    desc="Discover artisanal excellence in every GPU. 
                                    Our skilled artisans pour heart and soul into crafting each piece from concept to stitch, 
                                    using eco-conscious materials for elegance with a greener conscience"
                                />
                                <ProductGrid category="bags" />
                            </>
                        }
                    />
                    <Route
                        path="/ram"
                        element={
                            <>
                                <CategoryDescription
                                    title="RAM"
                                    desc="Our remarkable assortment of RAM, where artistry meets functionality. 
                                    Handpicked materials are thoughtfully sourced, and each RAM is crafted to bring you a stunning and versatile memory. 
                                    Designed to elevate your workflow."
                                />
                                <ProductGrid category="hats" />
                            </>
                        }
                    />
                    <Route
                        path="/motherboard"
                        element={
                            <>
                                <CategoryDescription
                                    title="Motherboards"
                                    desc="Our remarkable assortment of motherboards, where artistry meets functionality. 
                                    Handpicked materials are thoughtfully sourced, and each motherboard is crafted to bring you a stunning and versatile board. 
                                    Designed to elevate your exprience."
                                />
                                <ProductGrid category="hats" />
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