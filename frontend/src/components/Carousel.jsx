import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link} from "react-router-dom";

const images = [
  "/temp01.png",
  "/temp02.png",
  "/temp03.png",
];

const Carousel = () => {
  return (
    <Link to="/register">
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3s
        loop={true} // Infinite loop
        navigation={true} // Arrows
        pagination={{ clickable: true }} // Dots below
        className="w-full h-96" // Full width & height
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
    </Link>
  );
};

export default Carousel;
