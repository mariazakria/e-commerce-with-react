import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';

export default function SliderMain() {
  async function getCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET"
      };
      return await axios.request(options);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  if (isError) return <div>Error loading categories</div>;

  return (
    <section className='my-8'>
      <h2 className='mb-5 font-semibold text-gray-600 text-lg'>Shop Popular Categories</h2>

      <Swiper
        spaceBetween={20}
        loop={true}
        speed={300}
        autoplay={{ delay: 500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {data?.data?.data.map((category) => (
          <SwiperSlide key={category._id}>
            <div className='h-72 mb-4 rounded-md overflow-hidden'>
              <img
                className='w-full h-auto sm:h-full sm:object-cover'
                src={category.image}  
                alt={category.name}    
              />
            </div>
            <h3 className='mt-2'>{category.name}</h3>  
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
