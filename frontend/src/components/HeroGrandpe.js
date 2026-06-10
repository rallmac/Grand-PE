import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function HeroGrandpe({
  slides = [],
  autoPlay = true,
  interval = 5000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 👉 Next / Prev
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // 👉 Auto play
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isHovered, autoPlay, interval]);

  if (!slides.length) return null;

  return (
    <section className="px-6 lg:px-8 mt-6">
      <div
        className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[420px] object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center px-8 lg:px-16">

              {/* LEFT TEXT */}
              <div className="max-w-lg text-white z-10">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {slide.title}
                </h1>

                <p className="text-sm lg:text-base opacity-90 mb-6">
                  {slide.description}
                </p>

                <Link
                  to={slide.link}
                  className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-medium"
                >
                  {slide.buttonText}
                </Link>
              </div>

              {/* RIGHT FLOATING PANELS */}
              <div className="hidden lg:flex flex-1 justify-end items-center gap-4 pr-10">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="w-28 h-40 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-lg transform rotate-[8deg]"
                  />
                ))}
              </div>

            </div>
          </div>
        ))}

        {/* NAV BUTTONS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}