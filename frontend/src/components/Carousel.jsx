import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/temp1.png",
  "/temp2.png",
  "/temp3.png",
];

const Carousel = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3s
        loop={true} // Infinite loop
        navigation={true} // Arrows
        pagination={{ clickable: true }} // Dots below
        className="w-full h-[600px]" // Full width & height
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image not found:", e.target.src);
                e.target.src = "/carousel1.jpg"; // Fallback image
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
