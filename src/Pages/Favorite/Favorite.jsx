import React, { useContext, useState } from 'react';
import { cartContext } from '../../Context/Cart.context';
import { wishlistContext } from '../../Context/Wishlist.context';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Favorite() {
    const { addProductToCart } = useContext(cartContext);
    const { wishlistItems, loading, removeFromWishlist } = useContext(wishlistContext);
    const [removingIds, setRemovingIds] = useState(new Set());
    const [addingToCartIds, setAddingToCartIds] = useState(new Set());

    const handleRemoveFromWishlist = async (productId) => {
        setRemovingIds(prev => new Set([...prev, productId]));
        try {
            await removeFromWishlist(productId);
        } finally {
            setRemovingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    const handleAddToCart = async (productId) => {
        setAddingToCartIds(prev => new Set([...prev, productId]));
        try {
            await addProductToCart({ productId });
        } finally {
            setAddingToCartIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>My Wishlist - ShopNow Store</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-8">My Wishlist</h1>

                {loading ? (
                    <Loading />
                ) : wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">
                            <i className="far fa-heart text-gray-300"></i>
                        </div>
                        <h2 className="text-xl font-medium text-gray-600 mb-4">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-6">Browse our products and add items you love to your wishlist</p>
                        <Link 
                            to="/products" 
                            className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                                <Link to={`/product/${product._id}`} className="block relative">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                                </Link>

                                <div className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                                            <Link to={`/product/${product._id}`}>{product.title}</Link>
                                        </h3>
                                        <button 
                                            onClick={() => handleRemoveFromWishlist(product._id)}
                                            className="text-red-500 hover:text-red-600 disabled:opacity-50"
                                            disabled={removingIds.has(product._id)}
                                        >
                                            {removingIds.has(product._id) ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <i className="fas fa-heart"></i>
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-600 font-semibold">{product.price} L.E</span>
                                        <div className="flex items-center space-x-1">
                                            <span>{product.ratingsAverage}</span>
                                            <i className="fas fa-star text-yellow-400"></i>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className="w-full py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        disabled={addingToCartIds.has(product._id)}
                                    >
                                        {addingToCartIds.has(product._id) ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                Adding...
                                            </>
                                        ) : (
                                            'Add to Cart'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
