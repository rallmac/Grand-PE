import { useMemo, useState } from "react";
import "./solar-page.css";


export default function Hero() {
  const slides = useMemo(
    () => [
      { src: "/assets/images/carousel-1.jpg", alt: "Discover Top Electronics" },
      { src: "/assets/images/carousel-2.jpg", alt: "Discover Top Electronics 2" },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="solar-section solar-container">
      <div className="solar-hero-frame">
        <div
          className="solar-hero-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="solar-hero-slide" key={slide.src}>
              <div className="solar-image-card solar-hero-card">
                <img src={slide.src} alt={slide.alt} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="solar-hero-arrow solar-hero-arrow-left"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="solar-hero-arrow solar-hero-arrow-right"
          onClick={goNext}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="solar-hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`solar-hero-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
