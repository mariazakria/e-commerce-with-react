import img1 from "../../assets/images/slider-image-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-image-3.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// swiper ==> by3ml swiper momkn ab3tlo props
// SwiperSlide ==> hy3ml slide gwa elslider
// slidesPerView={1}
// loop={true}
// autoplay={{
//   delay: 1000,
//   disableOnInteraction: false,
// }}
export default function HomeSlider() {
  return (
    <>
    <section className="grid grid-cols-12 mb-3">
    <div className="col-span-8">
      <Swiper
        className="h-full"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >

<SwiperSlide>
          <img className="w-full h-full object-cover" src={img1} alt="Slider 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={img1} alt="Slider 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-full object-cover" src={img1} alt="Slider 3" />
        </SwiperSlide>
      </Swiper>
    </div>

        <div className="col-span-4">
            <img className="w-full" src={img2} alt="Slider 2" />
            <img className="w-full" src={img3} alt="Slider 3" />
        </div>
    </section>
    </>
  )
}
