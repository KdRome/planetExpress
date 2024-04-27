import React, { useState, useEffect } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import StarRatings from "../product-grid/StarRatings";
import axios from "axios";

function RelatedProducts({ category }) {
    const [products, setProduct] = useState([]);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${apiUrl}products/related/${category}`);

                setProduct({
                    products: response.data.products,
                    isDataLoaded: true,
                });
            } catch (error) {
                console.log("Problem with API connectivity", error);
            }
        };

        fetchProductData();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <div className="max-w-screen-2xl mx-auto p-9 pt-2">
            <h2 className="text-3xl text-center m-6">You may also like</h2>

            <div className="flex flex-row justify-start lg:justify-center overflow-scroll">
                {products.isDataLoaded ? (
                    products.products.map((product) => {
                        return (
                            <div
                                className="flex flex-col p-4 m-4 ml-0 light-gray-bg-custom w-1/5 min-w-[50%] sm:min-w-[40%] lg:min-w-[200px]"
                                key={product.id}
                            >
                                <a
                                    href={product.id}
                                    className="flex
                                 flex-col hover:underline"
                                >
                                    <LazyLoadImage
                                        effect="blur"
                                        src={product.image}
                                        alt={product.description}
                                        className="mb-4 w-full"
                                    />

                                    <h4 className="text-lg font-medium mb-1">
                                        {product.title}
                                    </h4>
                                </a>

                                <StarRatings rating={product.rating} />

                                <p className="w-4/5 text-sm">
                                    {product.description}
                                </p>

                                {product.discounted_price ? (
                                    <div className="flex flex-col sm:flex-row float-left pt-3 pb-3">
                                        <span className="text-base line-through pr-2">
                                            ${product.price}
                                        </span>

                                        <span className="text-emerald-600 text-xl">
                                            ${product.discounted_price}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl pt-3 pb-3">
                                        ${product.price}
                                    </span>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default RelatedProducts;