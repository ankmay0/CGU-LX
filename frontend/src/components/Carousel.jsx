import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "/carousel1.jpg",
  "/carousel2.jpg",
  "/carousel3.jpg",
  "/carousel4.jpg",
  "/carousel5.jpg"
];

const Carousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                console.error("Image not found:", e.target.src);
                e.target.src = "/fallback.jpg"; // Replace with a default fallback image
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
