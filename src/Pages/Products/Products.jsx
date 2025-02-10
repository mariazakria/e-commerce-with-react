import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
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
        } finally {
            setLoading(false);
        }
    }

    async function getBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBrands();
        getCategories();
    }, []);

    useEffect(() => {
        getProducts();
        setSearchParams(filters);
    }, [filters]);

    const handleFilterChange = (e) => {
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            />
                        </div>

                        {/* Price Range */}
                        <div className="flex gap-2">
                            <div>
                                <label  className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    name="priceFrom"
                                    value={filters.priceFrom}
                                    onChange={handleFilterChange}
                                    placeholder="From"
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
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

                {/* Products Grid */}
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h3>
                                        <p className="text-primary-600 font-semibold">{product.price} L.E</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center mt-8 gap-2">
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={filters.page === 1}
                                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                const isCurrentPage = pageNumber === filters.page;
                                
                                // Show ellipsis for large page numbers
                                if (totalPages > 7) {
                                    // Always show first and last page
                                    if (pageNumber === 1 || pageNumber === totalPages) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setFilters(prev => ({ ...prev, page: pageNumber }))}
                                                className={`px-3 py-1 rounded-md ${
                                                    isCurrentPage 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    
                                    // Show current page and adjacent pages
                                    if (
                                        pageNumber === filters.page ||
                                        pageNumber === filters.page - 1 ||
                                        pageNumber === filters.page + 1
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setFilters(prev => ({ ...prev, page: pageNumber }))}
                                                className={`px-3 py-1 rounded-md ${
                                                    isCurrentPage 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    
                                    // Show ellipsis
                                    if (
                                        pageNumber === 2 ||
                                        pageNumber === totalPages - 1
                                    ) {
                                        return <span key={pageNumber} className="px-2">...</span>;
                                    }
                                    
                                    return null;
                                }
                                
                                // Show all pages if total pages is 7 or less
                                return (
                                    <button
                                    key={pageNumber}
                                    onClick={() => setFilters(prev => ({ ...prev, page: pageNumber }))}
                                    className={`px-3 py-1 rounded-md ${
                                        isCurrentPage 
                                        ? 'bg-red-500 text-white' 
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                                );
                            })}

                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={filters.page === totalPages}
                                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
