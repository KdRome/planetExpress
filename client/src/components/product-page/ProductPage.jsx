import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "../product-grid/StarRatings";
import AddToCartButton from "./AddToCartButton";

import { ToastContainer } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import RelatedProducts from "./RelatedProducts";
import axios from "axios";

function ProductPage() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${apiUrl}products/${id}`);
                console.log(response.data.product);
                setProduct(response.data.product);
            } catch (error) {
                console.log("Problem with API connectivity", error);
            }
        };

        fetchProductData();
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto p-9 flex flex-col lg:flex-row mt-6 mb-8">
                {product ? (
                    <div
                        className="flex flex-col lg:flex-row w-full gap-x-24 justify-center"
                        key={product.id}>
                    
                        <div className="flex justify-center">
                            <LazyLoadImage
                            effect="blur"
                            src={product.image}
                            alt={product.image}
                            className=""
                            wrapperClassName="product-image mb-8 lg:mb-0"
                            width={400}
                            height={400}
                            />
                        </div>

                        <div className="flex flex-col w-full lg:max-w-lg">
                            <h1 className="text-3xl mb-1">
                                {product.title}
                            </h1>

                            <StarRatings rating={product.rating} />

                            {product.discounted_price ? (
                                <div className="float-left pt-3 pb-3 border-b mb-2">
                                    <span className="line-through pr-2 text-lg">
                                        ${product.price}
                                    </span>

                                    <span className="text-emerald-600 text-xl">
                                        ${product.discounted_price}
                                    </span>
                                </div>
                            ) : (
                                <span className="pt-3 pb-3 border-b mb-2 text-xl">
                                    ${product.price}
                                </span>
                            )}

                            <p className="pt-3 pb-3 w-full text-base">
                                {product.description}
                            </p>

                            <AddToCartButton product={product} />
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <ToastContainer />
            </div>

            {product.length > 0 ? (
                <RelatedProducts category={product.category} />
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default ProductPage;