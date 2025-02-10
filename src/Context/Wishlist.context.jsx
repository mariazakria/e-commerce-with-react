import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from './User.context';

export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(UserContext);

    async function getLoggedUserWishlist() {
        try {
            if (!token) {
                setLoading(false);
                return;
            }

            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: { token }
            });
            setWishlistItems(data.data);
            return data;
        } catch (error) {
            console.error('Error getting wishlist:', error.response?.data || error.message);
            return error;
        } finally {
            setLoading(false);
        }
    }

    async function addToWishlist(productId) {
        const loading = toast.loading("Waiding to add produt to wishlist")
        try {
            if (!token) {
                toast.error('Please login to add items to wishlist');
                return;
            }

            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                { headers: { token } }
            );
            
            if (data.status === 'success') {
                setWishlistItems(data.data);
                toast.success('Product added to wishlist');
            } else {
                throw new Error(data.message || 'Failed to add product');
            }
            return data;
        } catch (error) {
            console.error('Error adding to wishlist:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to add product to wishlist');
            return error;
        }finally{
            toast.dismiss(loading)
        }
    }

    async function removeFromWishlist(productId) {
        try {
            if (!token) {
                toast.error('Please login to manage wishlist');
                return;
            }

            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: { token } }
            );
            
            if (data.status === 'success') {
                // Remove the item from local state immediately
                setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
                toast.success('Product removed from wishlist');
            } else {
                throw new Error(data.message || 'Failed to remove product');
            }
            return data;
        } catch (error) {
            console.error('Error removing from wishlist:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to remove product from wishlist');
            return error;
        }
    }

    useEffect(() => {
        if (token) {
            getLoggedUserWishlist();
        } else {
            setWishlistItems([]); // Clear wishlist when logged out
        }
    }, [token]);

    return (
        <wishlistContext.Provider
            value={{
                wishlistItems,
                loading,
                addToWishlist,
                removeFromWishlist,
                getLoggedUserWishlist
            }}
        >
            {children}
        </wishlistContext.Provider>
    );
}
