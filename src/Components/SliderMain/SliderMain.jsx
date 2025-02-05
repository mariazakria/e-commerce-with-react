import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function SliderMain() {
    const[category, setCategory] = useState(null);

    async function getCategories() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET"
            };
            const { data } = await axios.request(options);
            setCategory(data.data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

  return (
    <section className='my-8'>
        <h2 className='mb-5 font-semibold text-gray-600 text-lg'>Shop Popular Categories</h2>
        {!category ? <Loading /> :
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
                {category.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className='h-72 mb-4 rounded-md overflow-hidden'>
                            <img className='w-full h-auto sm:h-full sm:object-cover ' src={category.image} alt={category.name} />
                        </div>
                        <h3 className='mt-2'>{category.name}</h3>
                    </SwiperSlide>
                ))}
            </Swiper>
        }
    </section>
  );
}
