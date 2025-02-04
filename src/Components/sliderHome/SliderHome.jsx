import img from '../../assets/images/slider-image-1.jpeg';
import img2 from '../../assets/images/slider-image-2.jpeg';
import img3 from '../../assets/images/slider-image-3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function SliderHome() {
  return (
    <>
      <section className="grid grid-cols-12 mb-3">
        <div className="col-span-8">
          <Swiper className='h-full'
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 1000, 
                disableOnInteraction: false, 
              }}
           
          >
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={img3} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={img3} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={img3} alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <img className="w-full " src={img2} alt="Side Image 1" />
          <img className="w-full" src={img} alt="Side Image 2" />
        </div>
      </section>
    </>
  );
}
