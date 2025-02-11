import React, { useContext, useState } from 'react';
import { cartContext } from '../../Context/Cart.context';
import { wishlistContext } from '../../Context/Wishlist.context';
import { UserContext } from '../../Context/User.context';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useConection from '../../Hook/UseConection/UseConection';

export default function Card({ productInfo }) {
  const { category, imageCover, price, ratingsAverage, title, description, id } = productInfo;
  const { addProductToCart } = useContext(cartContext);
  const wishlistCtx = useContext(wishlistContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const Online = useConection();

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    
    if (!Online) {
      toast.error('No internet connection');
      return;
    }

    if (!token) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    if (!wishlistCtx || !wishlistCtx.addToWishlist || !wishlistCtx.removeFromWishlist) {
      toast.error('Wishlist functionality is not available');
      return;
    }

    try {
      if (isInWishlist) {
        await wishlistCtx.removeFromWishlist(id);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await wishlistCtx.addToWishlist(id);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const handleProductView = (e) => {
    if (!Online) {
      e.preventDefault();
      toast.error('No internet connection');
    }
  };

  return (
    <>
      {!Online && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
          No Internet Connection
        </div>
      )}
      <div className="mb-8 card group rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-100 hover:border hover:border-primary-600">
        <Link to={`/product/${productInfo.id}`} className="relative block">
          <img src={imageCover} alt={title} className="card-img" />
          <div className="layer group-hover:opacity-100 transition-opacity duration-300 gap-2 flex justify-center items-center absolute w-full h-full left-0 top-0 bg-slate-400 bg-opacity-35 opacity-0">
            <Link 
              to={`/product/${id}`} 
              className={`icon cursor-pointer w-8 h-8 rounded-full ${Online ? 'bg-primary-500' : 'bg-gray-400'} text-white hover:text-white flex justify-center items-center`}
              onClick={handleProductView}
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
            <div 
              onClick={handleWishlistToggle} 
              className={`icon cursor-pointer w-8 h-8 rounded-full ${Online ? 'bg-primary-500' : 'bg-gray-400'} text-white flex justify-center items-center ${isInWishlist ? 'bg-red-500' : ''}`}
            >
              <i className={`fa-solid fa-heart ${isInWishlist ? 'text-white' : ''}`}></i>
            </div>
          </div>
        </Link>

        <div className="space-y-3 card-body p-4">
          <header>
            <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h3>
            <h4 className="text-primary-500 font-semibold">{category?.name}</h4>
          </header>
          <p className="text-gray-400 line-clamp-2 text-sm">{description}</p>

          <div className="flex items-center justify-between">
            <span className="text-primary-800 font-semibold">{price} L.E</span>
            <div className="flex items-center space-x-1">
              <span>{ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-300"></i>
            </div>
          </div>

          <div className="relative">
            <div className="w-full mt-3 flex justify-end">
              <button 
                onClick={()=>{
                  if (!Online) {
                    toast.error('No internet connection');
                    return;
                  }
                  addProductToCart({productId : id})
                }} 
                className="ms-5 rounded-lg px-2 py-2 text-light fw-bold bg-primary-600 text-white font-semibold opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}