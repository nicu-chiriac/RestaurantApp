import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";
import picture1 from '../../assets/img/slider/slider1.jpg';
import picture2 from '../../assets/img/slider/slider2.jpg';
import picture3 from '../../assets/img/slider/slider3.jpg';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={picture1} alt="social media" /></SwiperSlide>
        <SwiperSlide><img src={picture2} alt="social media" /></SwiperSlide>
        <SwiperSlide><img src={picture3} alt="social media" /></SwiperSlide>
      </Swiper>
    </>
  );
}