import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = useMemo(
    () => [
      {
        image: "/assets/images/carousel-1.jpg",
        title: "Grand-PE Solar",
        description:
          "From Homes to Industries, We Light the Way — Seamless Solar Solutions for All.",
        link: "/solar",
        buttonText: "Explore Solar",
      },
      {
        image: "/assets/images/GRAND_PE_TECH.png",
        title: "Grand-PE Tech",
        description: "Empowering Innovation — Smart Tech, Smarter Future.",
        link: "/tech",
        buttonText: "Discover Tech",
      },
      {
        image: "/assets/images/GRAND_PE_TRANSLATE.jpg",
        title: "Grand-PE Translate",
        description:
          "Bridging Voices — Empowering Communication Through Sign and Speech.",
        link: "/translate",
        buttonText: "Our Services",
      },
      {
        image: "/assets/images/plants1.png",
        title: "Grand-PE Plants & Export",
        description: "From Native Soil to Global Shelves.",
        link: "/plants",
        buttonText: "View Products",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const next = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="bg-gray-100 mt-4 md:mt-6 py-4 px-3 md:px-6">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl">

        {/* Slides */}
        <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[340px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* ✅ Reduced overlay (50% lighter) */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="text-white pl-6 sm:pl-10 md:pl-20 pr-4 md:pr-10 pb-6 md:pb-0 max-w-lg">
                  
                  <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base md:text-base mb-4 font-semibold opacity-95">
                    {slide.description}
                  </p>

                  <Link
                    to={slide.link}
                    className="inline-block bg-[#265073] hover:bg-[#1f3e59] transition text-white text-sm md:text-base px-5 py-2.5 md:px-6 md:py-3 rounded-md font-semibold"
                  >
                    {slide.buttonText}
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute text-white left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 shadow flex items-center justify-center z-20"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute text-white right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 shadow flex items-center justify-center z-20"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}