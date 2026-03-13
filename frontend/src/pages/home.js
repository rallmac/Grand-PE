import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import { FooterGrandpe } from "../components/FooterGrandpe";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: "/assets/images/carousel-1.jpg",
      title: "Grand-PE Solar",
      description: "From Homes to Industries, We Light the Way — Seamless Solar Solutions for All.",
      link: "/solar",
      buttonText: "Explore Solar"
    },
    {
      image: "/assets/images/GRAND_PE_TECH.png",
      title: "Grand-PE Tech",
      description: "Empowering Innovation — Smart Tech, Smarter Future.",
      link: "/tech",
      buttonText: "Discover Tech"
    },
    {
      image: "/assets/images/GRAND_PE_TRANSLATE.jpg",
      title: "Grand-PE Translate",
      description: "Bridging Voices — Empowering Communication Through Sign and Speech.",
      link: "/translate",
      buttonText: "Our Services"
    },
    {
      image: "/assets/images/plants1.png",
      title: "Grand-PE Plants & Export",
      description: "From Native Soil to Global Shelves.",
      link: "/plants",
      buttonText: "View Products"
    }
  ];

  useEffect(() => {
    // Set current year in footer
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <>
      {/* Header Section */}
      <header className="main-header">
        <div className="container">
          <Link to="/" className="logo">
            <img
              src="/assets/images/GRAND_PE_GLOBAL_LIMITED.jpg"
              alt="Grand-PE Global Limited Logo"
            />
          </Link>
          <button
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            ☰
          </button>
          <nav className="main-nav">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/solar">Solar</Link></li>
              <li><Link to="/tech">Tech</Link></li>
              <li><Link to="/translate">Translate</Link></li>
              <li><Link to="/plants">Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-carousel" id="homepage-hero-carousel">
            <div 
              className="hero-slides-wrapper"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  <div className="hero-content reveal-on-scroll">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <Link to={slide.link} className="btn btn-accent">
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button 
              className="prev-btn" 
              aria-label="Previous Slide"
              onClick={prevSlide}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="next-btn" 
              aria-label="Next Slide"
              onClick={nextSlide}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Brief Intro Section */}
        <section className="intro-section section-padding">
          <div className="container text-center">
            <h2 className="reveal-on-scroll">Welcome to Grand-PE Global Limited</h2>
            <p className="lead reveal-on-scroll">
              Your trusted partner for comprehensive solutions across solar energy,
              technology, language services, and agricultural exports. We are committed to
              excellence and innovation in every venture.
            </p>
            <p className="reveal-on-scroll">
              Our global commitment:
              <strong>
                "Empowering progress through diverse expertise and sustainable solutions
                for a brighter future."
              </strong>
            </p>
          </div>
        </section>

        {/* Links to Business Tabs Section */}
        <section className="business-tabs-links section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Core Businesses</h2>
            <div className="business-links">
              <div className="business-link-card reveal-on-scroll">
                <img
                    src={
                      "/assets/images/GRAND_PE_SOLAR_LOGO.png"
                    }
                    alt="Grand-PE-Solar-Logo"
                    width="120"
                    height="120"
                    style={{ display: "block", margin: "0 auto" }}
                />
                <h3>Grand-PE Solar</h3>
                <p>
                  Sustainable energy solutions for residential, commercial, and industrial
                  needs.
                </p>
                <Link to="/solar" className="btn btn-secondary">Learn More</Link>
              </div>
              <div
                className="business-link-card reveal-on-scroll"
                style={{ transitionDelay: "0.1s" }}
              >
                <img
                    src={
                      "/assets/images/GRAND_PE_TECH.png"
                    }
                    alt="Gand-PE-Tech_Logo"
                    width="120"
                    height="120"
                    style={{ display: "block", margin: "0 auto" }}
                />
                <h3>Grand-PE Tech</h3>
                <p>
                  Cutting-edge web/app development, software solutions, and IT consultancy.
                </p>
                <Link to="/tech" className="btn btn-secondary">Learn More</Link>
              </div>
              <div
                className="business-link-card reveal-on-scroll"
                style={{ transitionDelay: "0.2s" }}
              >
                <img
                    src={
                      "/assets/images/GRAND_PE_TRANSLATE.png"
                    }
                    alt="Grand-PE-Translate-Logo"
                    width="120"
                    height="120"
                    style={{ display: "block", margin: "0 auto" }}
                />
                <h3>Grand-PE Translate</h3>
                <p>
                  Professional ASL, spoken language interpretation, and translation
                  services.
                </p>
                <Link to="/translate" className="btn btn-secondary">Learn More</Link>
              </div>
              <div
                className="business-link-card reveal-on-scroll"
                style={{ transitionDelay: "0.3s" }}
              >
                <img
                    src={
                      "/assets/images/GRAND_PE_GLOBAL.png"
                    }
                    alt="Grand-PE-Plants-Logo"
                    width="120"
                    height="120"
                    style={{ display: "block", margin: "0 auto" }}
                />
                <h3>Grand-PE Plants & Export</h3>
                <p>
                  Quality herbal, pharmaceutical, and agricultural product sourcing and
                  exports.
                </p>
                <Link to="/plants" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Preview Section */}
        <section className="testimonial-preview section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">What Our Clients Say</h2>
            <div className="testimonial reveal-on-scroll">
              <p>
                "Grand-PE Solar's installation was seamless, and their team was incredibly
                professional. We're already seeing significant savings on our energy bills!"
              </p>
              <p>Aisha B., Homeowner</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <p>
                "The custom software developed by Grand-PE Tech has streamlined our
                operations and improved efficiency. A game-changer for our business."
              </p>
              <p>John K., CEO of Innovate Solutions</p>
            </div>
            <div className="text-center reveal-on-scroll" style={{ marginTop: 30 }}>
              <Link to="/about#testimonials" className="btn btn-primary">
                Read More Testimonials
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      < FooterGrandpe />

      <a
        href="https://wa.me/+2348064013822"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}

export default HomePage;