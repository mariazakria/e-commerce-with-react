import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useConection from '../../Hook/UseConection/UseConection';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const Online = useConection();
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        sort: searchParams.get('sort') || '',
        priceFrom: searchParams.get('price[gte]') || '',
        priceTo: searchParams.get('price[lte]') || '',
        brand: searchParams.get('brand') || '',
        page: parseInt(searchParams.get('page')) || 1,
        limit: parseInt(searchParams.get('limit')) || 12
    });

    async function getProducts() {
        if (!Online) {
            toast.error('No internet connection');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // Build query parameters
            const params = new URLSearchParams();
            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.sort) params.append('sort', filters.sort);
            if (filters.priceFrom) params.append('price[gte]', filters.priceFrom);
            if (filters.priceTo) params.append('price[lte]', filters.priceTo);
            if (filters.brand) params.append('brand', filters.brand);
            params.append('page', filters.page);
            params.append('limit', filters.limit);

            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`
            );
            setProducts(data.data);
            // Calculate total pages based on metadata from API
            const total = Math.ceil(data.results / filters.limit);
            setTotalPages(total);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    }

    async function getBrands() {
        if (!Online) {
            toast.error('No internet connection');
            return;
        }

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load brands');
        }
    }

    async function getCategories() {
        if (!Online) {
            toast.error('No internet connection');
            return;
        }

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load categories');
        }
    }

    useEffect(() => {
        if (Online) {
            getBrands();
            getCategories();
        }
    }, [Online]);

    useEffect(() => {
        if (Online) {
            getProducts();
            setSearchParams(filters);
        }
    }, [filters, Online]);

    const handleFilterChange = (e) => {
        if (!Online) {
            toast.error('No internet connection');
            return;
        }

        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1 
        }));
    };

    const sortOptions = [
        { value: 'title', label: 'Name: A to Z' },
        { value: '-title', label: 'Name: Z to A' },
        { value: '-price', label: 'Price: High to Low' },
        { value: 'price', label: 'Price: Low to High' },
    ];

    return (
        <>
            {!Online && (
                <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
                    No Internet Connection
                </div>
            )}

            <Helmet>
                <title>Shop Products - ShopNow Store</title>
                <meta
                    name="description"
                    content="Browse our wide selection of products at ShopNow Store. Find great deals on electronics, fashion, home goods and more. Filter by price, brand, and category."
                />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content="online shopping, electronics, fashion, home goods, ShopNow Store" />
                <meta name="author" content="Maria Zakaria" />
                
                <meta property="og:title" content="Shop Products - ShopNow Store" />
                <meta 
                    property="og:description" 
                    content="Browse our wide selection of products at ShopNow Store. Find great deals on electronics, fashion, home goods and more."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="https://img.freepik.com/free-vector/shopping-online_24877-49183.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta property="og:image:alt" content="ShopNow Store Products" />
                <meta property="og:site_name" content="ShopNow Store" />
                <meta property="og:locale" content="en_US" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Shop Products - ShopNow Store" />
                <meta 
                    name="twitter:description" 
                    content="Browse our wide selection of products at ShopNow Store. Find great deals on electronics, fashion, home goods and more."
                />
                <meta name="twitter:image" content="https://img.freepik.com/free-vector/shopping-online_24877-49183.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta name="twitter:site" content="@shopnowstore" />
                <meta name="twitter:creator" content="@mariazakria" />

                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                {/* Filters Section */}
                <div className=" rounded-lg p-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                name="keyword"
                                value={filters.keyword}
                                onChange={handleFilterChange}
                                placeholder="Search products..."
                                disabled={!Online}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none ${!Online ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                            />
                        </div>

                        {/* Price Range */}
                        <div className="flex gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    name="priceFrom"
                                    value={filters.priceFrom}
                                    onChange={handleFilterChange}
                                    placeholder="From"
                                    min="1"
                                    disabled={!Online}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none ${!Online ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                                <input
                                    type="number"
                                    name="priceTo"
                                    value={filters.priceTo}
                                    onChange={handleFilterChange}
                                    placeholder="To"
                                    min="1"
                                    disabled={!Online}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none ${!Online ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                name="sort"
                                value={filters.sort}
                                onChange={handleFilterChange}
                                disabled={!Online}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none ${!Online ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                            <select
                                name="brand"
                                value={filters.brand}
                                onChange={handleFilterChange}
                                disabled={!Online}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none ${!Online ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                            >
                                <option value="">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                {loading ? (
                    <Loading />
                ) : !Online ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">
                            <i className="fas fa-wifi text-gray-300"></i>
                        </div>
                        <h2 className="text-xl font-medium text-gray-600 mb-4">No Internet Connection</h2>
                        <p className="text-gray-500 mb-6">Please check your network and try again</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">
                            <i className="fas fa-box-open text-gray-300"></i>
                        </div>
                        <h2 className="text-xl font-medium text-gray-600 mb-4">No Products Found</h2>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <Link 
                                    to={`/product/${product._id}`} 
                                    className={`block relative ${!Online ? 'pointer-events-none' : ''}`}
                                    onClick={(e) => {
                                        if (!Online) {
                                            e.preventDefault();
                                            toast.error('No internet connection');
                                        }
                                    }}
                                >
                                    <img 
                                        src={product.imageCover} 
                                        alt={product.title} 
                                        className="w-full h-48 object-cover"
                                    />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        <Link 
                                            to={`/product/${product._id}`}
                                            className={!Online ? 'text-gray-400' : ''}
                                        >
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-primary-600 font-bold">{product.price} L.E</span>
                                        <div className="flex items-center">
                                            <span className="mr-1">{product.ratingsAverage}</span>
                                            <i className="fas fa-star text-yellow-400"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {Online && totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (!Online) {
                                            toast.error('No internet connection');
                                            return;
                                        }
                                        setFilters(prev => ({ ...prev, page: index + 1 }));
                                    }}
                                    className={`px-4 py-2 rounded-md ${
                                        filters.page === index + 1 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}