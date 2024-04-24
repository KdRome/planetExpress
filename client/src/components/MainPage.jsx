// import React, { useState, createContext } from "react";
// import { Route, Routes } from "react-router-dom";
// import AnnouncementBar from "./AnnouncementBar";
// import Header from "./Header";
// import CategoryDescription from "./product-grid/CategoryDescription";
// import ProductGrid from "./product-grid/ProductGrid";
// import Footer from "./Footer";
// import Cart from "./cart/Cart";
// import ProductPage from "./product-page/ProductPage";

// export const Context = createContext();

// function MainPage() {
//   const [cartCounter, setCartCounter] = useState(0);
//   const navigationItems = ["Shoes", "Bags", "Hats"];

//   return (
//     <Context.Provider value={[cartCounter, setCartCounter]}>
//       <AnnouncementBar title="Free Shipping in Europe" />
//       <Header navigationItems={navigationItems} />

//       <Routes>
//           <Route path="cart" element={<Cart />} /> // Changed from "/cart" to "cart"
//           <Route path="/" element={
//             <>
//               <CategoryDescription title="Products" desc="Experience the latest in fashion trends! Explore a curated collection of stylish shoes, trendy bags, and chic hats for a complete and elevated look. Shop now and define your personal style" />
//               <ProductGrid />
//             </>
//           } />
//           <Route path="shoes" element={ // Changed from "/shoes" to "shoes"
//             <>
//               <CategoryDescription title="Shoes" desc="Using mostly recycled fibers, we create sustainable shoes that combine comfort with timeless style. Step into our shoes and experience the difference of artisanal craftsmanship and eco-conscious design." />
//               <ProductGrid category="shoes" />
//             </>
//           } />
//           <Route path="bags" element={ // Changed from "/bags" to "bags"
//             <>
//               <CategoryDescription title="Bags" desc="Discover artisanal excellence in every bag. Our skilled artisans pour heart and soul into crafting each piece from concept to stitch, using eco-conscious materials for elegance with a greener conscience" />
//               <ProductGrid category="bags" />
//             </>
//           } />
//           <Route path="hats" element={ // Changed from "/hats" to "hats"
//             <>
//               <CategoryDescription title="Hats" desc="Our remarkable assortment of hats, where artistry meets functionality. Handpicked materials are thoughtfully sourced, and each hat is crafted to bring you a stunning and versatile accessory. Designed to elevate your style and offer comfort." />
//               <ProductGrid category="hats" />
//             </>
//           } />
//           <Route path="products/:id" element={<ProductPage />} /> // Changed from "/products/:id" to "products/:id"
//       </Routes>

//       <Footer />
//     </Context.Provider>
//   );
// }

// export default MainPage;
