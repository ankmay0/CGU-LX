import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const desktopImages = ["/temp01.png", "/temmp02.png"];
const mobileImages = ["/mobile01.jpg", "/mobile02.jpg"];

const Carousel = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;
  const redirectTo = user ? "/buy" : "/login";

  return (
    <div className="relative w-[100vw] px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto my-4 sm:my-6 lg:my-8 group rounded-xl">
      <Link
        to={redirectTo}
        className="block hover:scale-[1.005] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl"
        aria-label="Featured products carousel"
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectCreative]}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: user ? 2500 : 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true
          }}
          loop={true}
          speed={1000}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (_, className) =>
              `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            640: { spaceBetween: 24 },
            1024: { spaceBetween: 32 }
          }}
          className="carousel-container rounded-3xl"
          onSlideChange={() => setLoaded(true)}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-video sm:aspect-[2.4/1] lg:aspect-[3/1] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl lg:rounded-3xl" />
                <img
                  src={src}
                  alt={`Featured product ${index + 1}`}
                  className={`w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-transform duration-[1200ms] ease-out group-hover:scale-105 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  onError={(e) => {
                    console.error("Image not found:", e.target.src);
                    e.target.src = "/fallback.jpg";
                  }}
                />
<div className="absolute bottom-8 left-8 z-20 text-white max-w-2xl">
  {/* <h2 className="text-3xl sm:text-xl md:text-2xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
    New Collection 2024
  </h2> */}
  <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 animate-fade-in-up delay-100">
    Hello Beta Testers!
  </p>
</div>

              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation */}
          <div className="swiper-button-prev-custom hidden sm:flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 ease-out [box-shadow:0_4px_24px_rgba(0,0,0,0.12)] hover:[box-shadow:0_6px_32px_rgba(0,0,0,0.18)] absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110">
            <svg className="w-5 h-5 lg:w-7 lg:h-7 text-white transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom hidden sm:flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 ease-out [box-shadow:0_4px_24px_rgba(0,0,0,0.12)] hover:[box-shadow:0_6px_32px_rgba(0,0,0,0.18)] absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110">
            <svg className="w-5 h-5 lg:w-7 lg:h-7 text-white transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      </Link>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.6);
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center center;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .swiper-pagination-bullet-custom:hover {
          transform: scale(1.4);
          background: rgba(255,255,255,0.9) !important;
        }

        .swiper-pagination-bullet-active {
          background: #fff !important;
          width: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(255,255,255,0.3);
        }

        @media (min-width: 640px) {
          .swiper-pagination-bullet-custom {
            width: 14px;
            height: 14px;
          }
          .swiper-pagination-bullet-active {
            width: 48px;
          }
        }

        .carousel-container {
          transition: opacity 0.5s ease-out;
        }

        @keyframes slideIn {
          0% { transform: scale(1.05); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;