import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import { FooterGrandpe } from "../components/FooterGrandpe";

function LandingPage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form states
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    message: ''
  });

  // Newsletter state
  // eslint-disable-next-line
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');
  // eslint-disable-next-line
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Statistics animation state
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Hero slides for landing page
  const heroSlides = [
    {
      image: '/assets/images/carousel-1.jpg',
      title: 'Grand-PE Solar',
      description: 'From Homes to Industries, We Light the Way — Seamless Solar Solutions for All.',
      link: '/solar',
      buttonText: 'Explore Solar'
    },
    {
      image: '/assets/images/GRAND_PE_TECH.png',
      title: 'Grand-PE Tech',
      description: 'Empowering Innovation — Smart Tech, Smarter Future.',
      link: '/tech',
      buttonText: 'Discover Tech'
    },
    {
      image: '/assets/images/GRAND_PE_TRANSLATE.jpg',
      title: 'Grand-PE Translate',
      description: 'Bridging Voices — Empowering Communication Through Sign and Speech.',
      link: '/translate',
      buttonText: 'Our Services'
    },
    {
      image: '/assets/images/plants1.png',
      title: 'Grand-PE Plants & Export',
      description: 'From Native Soil to Global Shelves — Premium Agricultural Exports.',
      link: '/plants',
      buttonText: 'View Products'
    }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Carousel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCarouselMouseEnter = () => {
    setIsPaused(true);
  };

  const handleCarouselMouseLeave = () => {
    setIsPaused(false);
  };

  // Form handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('Thank you for your inquiry! We will contact you within 24 hours to discuss your needs.');
    setTimeout(() => setFormStatus(''), 5000);
    // Reset form
    setContactFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service_interest: '',
      message: ''
    });
  };

    // eslint-disable-next-line
    const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('Thank you for subscribing to our newsletter!');
    setTimeout(() => setNewsletterStatus(''), 4000);
    setNewsletterEmail('');
  };

  // Counter animation function
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  };

  useEffect(() => {
    // Set current year in footer
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Carousel auto-advance
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, heroSlides.length]);

  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';

          // Animate statistics counters when stats section comes into view
          if (entry.target.classList.contains('stats-section') && !statsAnimated) {
            setStatsAnimated(true);
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target'));
              animateCounter(counter, target);
            });
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [statsAnimated]);

  return (
    <>
      {/* Header */}
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
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" className="active" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/solar" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
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
              onMouseEnter={handleCarouselMouseEnter}
              onMouseLeave={handleCarouselMouseLeave}
            >
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 1.2s ease-in-out',
                    zIndex: index === currentSlide ? 2 : 1
                  }}
                >
                  {/* Dark overlay for text readability */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    zIndex: 1
                  }} />
                  <div className="hero-content" style={{ position: 'relative', zIndex: 3, maxWidth: '850px', padding: '20px' }}>
                    <h1 style={{ 
                      fontSize: '3.8rem', 
                      marginBottom: '0.5em', 
                      color: 'var(--light-text-color)', 
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)', 
                      fontWeight: '700' 
                    }}>
                      {slide.title}
                    </h1>
                    <p style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '1.5em', 
                      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', 
                      fontWeight: '400',
                      color: 'var(--light-text-color)'
                    }}>
                      {slide.description}
                    </p>
                    <Link to={slide.link} className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
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
            {heroSlides.map((_, index) => (
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

        {/* Company Statistics Section */}
        <section className="stats-section section-padding bg-light reveal-on-scroll">
          <div className="container">
            <h2 className="text-center">Our Impact in Numbers</h2>
            <div className="stats-grid">
              <div className="stat-item reveal-on-scroll">
                <div className="stat-number" data-target="500">0</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <div className="stat-number" data-target="250">0</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <div className="stat-number" data-target="15">0</div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat-item reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <div className="stat-number" data-target="4">0</div>
                <div className="stat-label">Business Divisions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Links to Business Tabs Section */}
        <section className="business-tabs-links section-padding">
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
                  needs with cutting-edge solar technology.
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
                  Cutting-edge web/app development, software solutions, and IT consultancy
                  for modern businesses.
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
                  services bridging communication barriers.
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
                  exports to global markets.
                </p>
                <Link to="/plants" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="featured-projects section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Featured Projects & Achievements</h2>
            <div className="projects-showcase">
              <div className="project-highlight reveal-on-scroll">
                <img src="/assets/images/carousel-1.jpg" alt="Solar Installation Project" />
                <div className="project-info">
                  <h4>500kW Industrial Solar Installation</h4>
                  <p>Successfully completed a major solar installation for a manufacturing facility, reducing energy costs by 60% and carbon footprint significantly.</p>
                  <span className="project-category">Solar Energy</span>
                </div>
              </div>
              <div className="project-highlight reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
                <img src="/assets/images/GRAND_PE_TECH.png" alt="Software Development Project" />
                <div className="project-info">
                  <h4>E-commerce Platform Development</h4>
                  <p>Developed a comprehensive e-commerce solution with mobile app integration, increasing client sales by 200% within the first year.</p>
                  <span className="project-category">Technology</span>
                </div>
              </div>
              <div className="project-highlight reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <img src="/assets/images/plants2.png" alt="Agricultural Export Project" />
                <div className="project-info">
                  <h4>International Aloe Vera Export</h4>
                  <p>Established export partnerships for premium aloe vera products, reaching markets in 8 countries with certified organic products.</p>
                  <span className="project-category">Agricultural Export</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section section-padding">
          <div className="container">
            <div className="contact-intro text-center reveal-on-scroll">
              <h2>Ready to Start Your Project?</h2>
              <p className="lead">Get in touch with us to discuss how Grand-PE Global can help transform your business with our comprehensive solutions.</p>
            </div>
            <form onSubmit={handleContactSubmit} className="contact-form reveal-on-scroll">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name:</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="name" 
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address:</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    name="email" 
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone Number:</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    name="phone" 
                    value={contactFormData.phone}
                    onChange={handleContactInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-company">Company/Organization:</label>
                  <input 
                    type="text" 
                    id="contact-company" 
                    name="company" 
                    value={contactFormData.company}
                    onChange={handleContactInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-service">Service Interest:</label>
                <select 
                  id="contact-service" 
                  name="service_interest"
                  value={contactFormData.service_interest}
                  onChange={handleContactInputChange}
                  required
                >
                  <option value="">-- Select Service --</option>
                  <option value="solar">Solar Energy Solutions</option>
                  <option value="tech">Technology Services</option>
                  <option value="translate">Translation & Interpretation</option>
                  <option value="plants">Plants & Agricultural Export</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Your Message:</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Send Inquiry</button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
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

export default LandingPage;