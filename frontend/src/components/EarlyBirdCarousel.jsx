import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import anime from "animejs";

const EarlyBirdCarousel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    anime.timeline({ loop: true })
      .add({
        targets: ".ml15 .word",
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 * i,
      })
      .add({
        targets: ".ml15 .word",
        color: ["#FF5733", "#33FF57", "#5733FF"],
        easing: "easeInOutQuad",
        duration: 1500,
      })
      .add({
        targets: ".ml15",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });

    anime({
      targets: ".signup-btn",
      scale: [1, 1.1, 1],
      easing: "easeInOutQuad",
      duration: 1000,
      loop: true,
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0.001 text-center z-10">
        {/* <h2 className="ml15 text-7xl font-bold text-white">
          <span className="word">Coming Soon...</span>
        </h2> */}
        <button
          onClick={() => navigate("/register")}
          className="signup-btn mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Sign Up to Get Early Bird Offers
        </button>
      </div>
      <div className="w-full h-screen relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="rounded-lg shadow-lg h-full"
        >
          <SwiperSlide>
            <img
              src="temp1.png"
              alt="Exclusive Deals"
              className="w-full h-full object-cover scale-100 transition-transform duration-500 hover:scale-105"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="temp2.png"
              alt="Best Offers"
              className="w-full h-full object-cover scale-100 transition-transform duration-500 hover:scale-105"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="temp3.png"
              alt="College Marketplace"
              className="w-full h-full object-cover scale-100 transition-transform duration-500 hover:scale-105"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default EarlyBirdCarousel;