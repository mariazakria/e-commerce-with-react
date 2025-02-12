
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {

    async function getCategories() {
        try {
            return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        } catch (error) {
            console.log(error);
        } 
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: getCategories,
        staleTime: 1000,
        refetchOnMount: true,
        refetchInterval: 1 * 60 * 60 * 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      });
    
      console.log("category",data);
      
      if (isLoading) return <Loading />;
    
    return (
        <>
            <Helmet>
                <title>Categories - ShopNow Store</title>
                <meta 
                    name="description" 
                    content="Explore our wide range of product categories at ShopNow Store. From electronics to fashion, find everything you need in our organized shopping categories."
                />
                <meta name="author" content="Maria Zakaria" />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content="shopping categories, online store categories, electronics, fashion, home goods, accessories" />
                
                <meta property="og:title" content="Shop by Categories - ShopNow Store" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content="ShopNow Store" />
                <meta property="og:locale" content="en_US" />
                <meta 
                    property="og:description" 
                    content="Explore our wide range of product categories at ShopNow Store. From electronics to fashion, find everything you need in our organized shopping categories."
                />
                <meta property="og:image" content="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta property="og:image:alt" content="ShopNow Store Categories" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Shop by Categories - ShopNow Store" />
                <meta 
                    name="twitter:description" 
                    content="Explore our wide range of product categories at ShopNow Store. From electronics to fashion, find everything you need in our organized shopping categories."
                />
                <meta name="twitter:image" content="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta name="twitter:site" content="@shopnowstore" />
                <meta name="twitter:creator" content="@mariazakria" />
                
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
              
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.data.data.map((category) => (
                            <div key={category._id} className="group ">
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-center font-medium text-gray-800">{category.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </>
    );
}
