import React, { useState, useEffect, useMemo } from "react";

const ProductFiltering = ({ products, setFilteredProducts }) => {
    // User selected Min and max price values from filter
    const [price, setPrice] = useState({});
    // Sets state for mobile menu
    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState({
        cpuBrands: [],
        cpuCores: [],
        gpuBrands: [],
        gpuModels: [],
        ramSize: [],
        ramType: [],
        motherboardSocketType: [],
        motherboardFormFactor: []
    })

    const brands = useMemo(() => {
        const allBrands = products.map(product => product.cpu?.brand).filter(brand => brand != null);
        return [...new Set(allBrands)].sort();
    }, [products]);

    const cores = useMemo(() => {
        const allCores = products.map(product => product.cpu?.cores).filter(cores => cores != null);
        return [...new Set(allCores)].sort((a, b) => a - b);
    }, [products]);

    useEffect(() => {
        validate();
    }, [filters, price, products]);

    const filterByPrice = () => {
        return products.filter((product) => {
            // Gets discounted_price if available
            const productPrice = product.discounted_price || product.price;
            return (
                productPrice >= price.minValue && productPrice <= price.maxValue
            );
        });
    };

    const getPrices = () => {
        // Returns discounted_price if available
        return products.map((product) => {
            return product.discounted_price !== undefined
                ? product.discounted_price
                : product.price;
        });
    };

    const getMaxProductPrice = () => {
        return Math.max(...getPrices());
    };

    const getMinProductPrice = () => {
        return Math.min(...getPrices());
    };

    // Validates user input to return / set the correct products
    const validate = () => {

        let filteredProducts = products.filter(product => {
            return (
                // CPU
                (filters.cpuBrands.length === 0 || filters.cpuBrands.includes(product.cpu?.brand)) &&
                (filters.cpuCores.length === 0 || filters.cpuCores.includes(product.cpu?.cores))
                //GPU
                // (filters.gpuBrands.length === 0 || filters.gpuBrands.includes(product.gpu?.brand)) &&
                // (filters.gpuModels.length === 0 || filters.gpuModels.includes(product.gpu?.model)) &&
                // //RAM
                // (filters.ramSize.length === 0 || filters.ramSize.includes(product.ram?.memory_size.toString())) &&
                // (filters.ramType.includes(product.ram?.type)) &&
                // //Motherboard
                // (filters.motherboardSocketType.length === 0 || filters.motherboardSocketType.includes(product.motherboard?.socket_type)) &&
                // (filters.motherboardFormFactor.length === 0 || filters.motherboardFormFactor.includes(product.motherboard?.form_factor))
            );
        });

        // If the max price value is set
        if (price.maxValue)
            return setFilteredProducts({
                products: filterByPrice(),
                isFiltered: true,
            });

        setFilteredProducts({ products: filteredProducts, isFiltered: filteredProducts.length > 0 });
    };

    const handleBrandChange = (event) => {
        const { value, checked } = event.target;
    
        setFilters(prevFilters => {
            const updatedBrands = checked 
                ? [...prevFilters.cpuBrands, value]
                : prevFilters.cpuBrands.filter(item => item !== value);
    
            return { ...prevFilters, cpuBrands: updatedBrands };
        });
    
        validate();
    };
    
    const handleCoreChange = (event) => {
        const { value, checked } = event.target;
        //have to be int since they are ints in db
        const numericValue = parseInt(value, 10);

        setFilters(prevFilters => {
            const updatedCores = checked
                ? [...prevFilters.cpuCores, numericValue]  // Store cores as numbers
                : prevFilters.cpuCores.filter(core => core !== numericValue);

            return { ...prevFilters, cpuCores: updatedCores };
        });
    
        validate();
    };
    
    
    // Saves the price input into state
    const handlePriceFilter = (event) => {
        // Saves user value input into state
        setPrice({
            ...price, // Adds existing elements back into state
            [event.target.name]: Number(event.target.value),
        });
    };

    return (
        <div className="sticky top-36 z-9">
            <div className="flex justify-between">
                <h2 className="text-2xl lg:text-4xl font-light mb-6">
                    Filter by
                </h2>

                {/* Mobile hamburger icon */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`w-5 h-5 text-gray-800 ${
                                isOpen ? "hidden" : "block"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 8"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                            />
                        </svg>
                        <svg
                            className={`fill-current h-5 w-5 ${
                                isOpen ? "block" : "hidden"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`lg:flex lg:flex-col ${isOpen ? "block" : "hidden"}`}
            >
                <div className="border-t border-gray-200 p-3 pt-5 pb-0">
                    <span>CPU Brands: </span>
                    <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
                        {/* Creates a set to remove duplicates and renders each cpu brand */}
                        {brands.map((brand, index) => (
                            <li key={index} className="flex items-center pt-2 pb-2 pl-4">
                                <input
                                    id={`brand-${brand}`} // Ensure IDs are unique if brand names could be non-unique
                                    type="checkbox"
                                    name="cpuBrands"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={handleBrandChange}
                                    value={brand}
                                />
                                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-medium text-gray-900">
                                    {brand}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-gray-200 p-3 pt-5 pb-0">
                    <span>CPU Cores: </span>
                    <ul className="flex flex-row lg:flex-col mb-4 mt-4 lg:ml-4 flex-wrap">
                        {/* Creates a set to remove duplicates and renders each cpu Core */}
                        {cores.map((cores, index) => (
                            <li key={index} className="flex items-center pt-2 pb-2 pl-4">
                                <input
                                    id={`cores-${cores}`}
                                    type="checkbox"
                                    name="cpuCores"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={handleCoreChange}
                                    value={cores}
                                />
                                <label htmlFor={`cores-${cores}`} className="ml-2 text-sm font-medium text-gray-900">
                                    {cores}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-gray-200 p-3 pt-5 pb-5">
                    {/* Price filter */}
                    <span>Price: </span>

                    <div className="mb-4 mt-4 grid gap-4 grid-flow-col md:w-60">
                        <div className="md:w-28">
                            <span className="block text-sm mb-2">From</span>
                            <input
                                type="number"
                                placeholder={getMinProductPrice()}
                                className="border border-black w-full p-2 text-sm"
                                name="minValue"
                                onChange={handlePriceFilter}
                            ></input>
                        </div>

                        <div className="md:w-28">
                            <span className="block text-sm mb-2">To</span>
                            <input
                                type="number"
                                placeholder={getMaxProductPrice()}
                                className="border border-black w-full p-2 text-sm"
                                name="maxValue"
                                onChange={handlePriceFilter}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFiltering;