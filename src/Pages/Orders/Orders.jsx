import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react';
import { UserContext } from '../../Context/User.context';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

export default function Orders() {
    const { token } = useContext(UserContext)
    const user = jwtDecode(token)

    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`,
            method: "GET",
        }
        return await axios.request(options)
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getUserOrders,
        staleTime: 1000,
        refetchOnMount: true,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })
    console.log(data);
    

    if (isLoading) return <Loading />

    return (
        <>
            <Helmet>
                <title>My Orders - ShopNow Store</title>
                <meta 
                    name="description" 
                    content="View and track your orders at ShopNow Store. Check order status, delivery details, and purchase history all in one place."
                />
                <meta name="author" content="Maria Zakaria" />
                <meta name="robots" content="noindex, follow" />
                <meta name="keywords" content="orders, order history, purchase history, track orders, shipping status" />
                
                <meta property="og:title" content="My Orders - ShopNow Store" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content="ShopNow Store" />
                <meta property="og:locale" content="en_US" />
                <meta 
                    property="og:description" 
                    content="View and track your orders at ShopNow Store. Check order status, delivery details, and purchase history all in one place."
                />
                <meta property="og:image" content="https://img.freepik.com/free-vector/order-tracking-concept-illustration_114360-1361.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta property="og:image:alt" content="Track Your Orders at ShopNow Store" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="My Orders - ShopNow Store" />
                <meta 
                    name="twitter:description" 
                    content="View and track your orders at ShopNow Store. Check order status, delivery details, and purchase history all in one place."
                />
                <meta name="twitter:image" content="https://img.freepik.com/free-vector/order-tracking-concept-illustration_114360-1361.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta name="twitter:site" content="@shopnowstore" />
                <meta name="twitter:creator" content="@mariazakria" />
                
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">My Orders</h1>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    {data.data && data.data.length > 0 ? (
                        <>
                            {/* Order Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                                    <p className="text-3xl font-bold text-primary-600">{data.data.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Paid Orders</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {data.data.filter(order => order.isPaid).length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-2xl shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">In Delivery</p>
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {data.data.filter(order => !order.isDelivered).length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-sm">
                                    <p className="text-sm text-gray-600 mb-1">Delivered</p>
                                    <p className="text-3xl font-bold text-indigo-600">
                                        {data.data.filter(order => order.isDelivered).length}
                                    </p>
                                </div>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-8">
                                {data.data.map((order) => (
                                    <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-100 transition-colors duration-300">
                                        <div className="p-6">
                                            {/* Order Header */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                        #{order.id}
                                                    </h2>
                                                    <p className="text-sm text-gray-500">
                                                        Ordered on {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                        order.isPaid 
                                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                    }`}>
                                                        {order.isPaid ? '✓ Payment Completed' : '⏳ Payment Pending'}
                                                    </span>
                                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                        order.isDelivered 
                                                        ? 'bg-blue-100 text-primary-800 border border-blue-200' 
                                                        : 'bg-orange-100 text-orange-800 border border-orange-200'
                                                    }`}>
                                                        {order.isDelivered ? '✓ Delivered' : '🚚 In Transit'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                                {order.cartItems.map((item) => (
                                                    <Link to={`/product/${item.product.id}`} key={item._id} 
                                                        className="group block overflow-hidden rounded-xl border border-gray-200 hover:border-primary-500 transition-all duration-300 hover:shadow-lg">
                                                        <div className="relative">
                                                            <img 
                                                                src={item.product.imageCover} 
                                                                alt={item.product.title} 
                                                                className="w-full  h-52 object-contain group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute top-3 right-3">
                                                                <span className="bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                                                    x{item.count}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600">
                                                                {item.product.title}
                                                            </h3>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-gray-500 uppercase tracking-wide">Price</span>
                                                                <span className="text-sm font-bold text-primary-600">{item.price} L.E</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>

                                            {/* Order Total */}
                                            <div className="mt-8 pt-6 border-t border-gray-100">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Amount</span>
                                                    <span className="text-2xl font-bold text-primary-600">
                                                        {order.totalOrderPrice} L.E
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
}
