import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function SolarPage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Project filtering state
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Form state
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    system_type: '',
    message: '',
    file_upload: null
  });
  const [formStatus, setFormStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Carousel slides data
  const heroSlides = [
    {
      image: "/assets/images/GRAND_PE_SOLAR_LOGO.png",
      title: "Residential Solar Installations",
      description: "Power your home with clean, reliable solar energy."
    },
    {
      image: "/assets/images/carousel-1.jpg", 
      title: "Industrial & Commercial Solar",
      description: "Optimize energy costs for your business with large-scale solar."
    },
    {
      image: "/assets/images/carousel-2.jpg",
      title: "Quality Solar Products", 
      description: "Top-tier panels, inverters, batteries, and mounting systems."
    },
    {
      image: "/assets/images/about.jpg",
      title: "Comprehensive Solar Services",
      description: "From consultation to maintenance, we've got you covered."
    }
  ];

  // Initialize page effects
  useEffect(() => {
    // Set current year
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Carousel initialized

    // Initialize scroll reveal
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { root: null, threshold: 0.1 }
      );
      
      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });

      return () => {
        revealElements.forEach((el) => {
          revealObserver.unobserve(el);
        });
      };
    }
  }, [currentSlide, heroSlides.length]);

  // Carousel auto-advance
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, heroSlides.length]);

  // Carousel controls
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleCarouselMouseEnter = () => {
    setIsPaused(true);
  };

  const handleCarouselMouseLeave = () => {
    setIsPaused(false);
  };

  // Mobile navigation
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Project filtering
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Form handling
  const handleQuoteInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setQuoteFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!quoteFormData.name || !quoteFormData.email || !quoteFormData.address) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteFormData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    setFormStatus('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.');
    setQuoteFormData({
      name: '', email: '', phone: '', address: '', system_type: '', message: '', file_upload: null
    });
    
    setTimeout(() => setFormStatus(''), 5000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('Thank you for subscribing!');
    setNewsletterEmail('');
    
    setTimeout(() => setNewsletterStatus(''), 3000);
  };

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
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/solar" className="active" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section for Solar */}
        <section className="hero business-page-hero">
          <div className="hero-carousel" id="solar-hero-carousel">
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

        <div className="container">
          <p className="page-slogan reveal-on-scroll">
            "From Homes to Industries, We Light the Way — Seamless Solar Solutions for All."
          </p>
        </div>

        {/* Products Section */}
        <section id="solar-products" className="section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Premium Solar Products</h2>
            <div className="item-grid">
              {[
                {
                  image: "/assets/images/GRAND_PE_SOLAR_LOGO.png",
                  title: "High-Efficiency Solar Panels",
                  description: "We offer a range of monocrystalline and polycrystalline panels from leading manufacturers, ensuring maximum power generation and durability."
                },
                {
                  image: "/assets/images/product-3.jpg",
                  title: "Advanced Solar Inverters",
                  description: "Choose from string, micro, and hybrid inverters designed for optimal energy conversion, reliability, and smart monitoring capabilities."
                },
                {
                  image: "/assets/images/carousel-1.jpg",
                  title: "Energy Storage Batteries",
                  description: "Secure your energy independence with our high-performance lithium-ion and lead-acid batteries for backup power and off-grid systems."
                },
                {
                  image: "/assets/images/carousel-2.jpg",
                  title: "Mounting & Accessories",
                  description: "Durable mounting structures, high-quality cables, connectors, and advanced monitoring systems to complete your solar setup."
                }
              ].map((product, index) => (
                <div 
                  key={index}
                  className="item-card reveal-on-scroll" 
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                  />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <a href="#get-quote" className="btn btn-primary btn-sm">Get Details</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="solar-services" className="services-section section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">
              Comprehensive Solar Services We Offer
            </h2>
            <div className="item-grid">
              {[
                { icon: 'fa-home', title: 'Residential Solar Systems', description: 'Custom-designed solar solutions for homes, reducing electricity bills and promoting sustainable living. Includes consultation, installation, and support.' },
                { icon: 'fa-industry', title: 'Commercial & Industrial Solar', description: 'Large-scale solar installations for businesses, factories, and agricultural enterprises to lower operational costs and enhance green credentials.' },
                { icon: 'fa-plug', title: 'Off-Grid & On-Grid Solutions', description: 'Expert design and implementation of both grid-tied systems for energy savings and standalone off-grid systems for remote power needs.' },
                { icon: 'fa-tools', title: 'Maintenance & Support', description: 'Proactive maintenance plans, system monitoring, and responsive support services to ensure your solar investment performs optimally for years.' }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="item-card reveal-on-scroll service-card"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <i className={`fas ${service.icon} fa-2x service-icon`}></i>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <section id="solar-projects" className="projects-gallery section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Solar Projects Showcase</h2>
            <p className="lead text-center reveal-on-scroll project-gallery-intro">
              Explore some of our successfully completed solar installations, delivering
              clean energy and significant savings.
            </p>
            <div className="filter-buttons text-center reveal-on-scroll">
              {['all', 'residential', 'commercial', 'industrial'].map((filter) => (
                <button
                  key={filter}
                  className={`btn btn-sm btn-outline-primary ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className="item-grid project-grid">
              {[
                {
                  category: 'residential',
                  image: '/assets/images/gallery-1.jpg',
                  title: 'Suburban Home, 10kW System',
                  description: 'Empowered a modern family home with a 10kW rooftop solar system, achieving 80% energy independence.'
                },
                {
                  category: 'industrial',
                  image: '/assets/images/GRAND_PE_TECH.jpg',
                  title: 'Factory Rooftop, 100kW Array',
                  description: 'Installed a 100kW solar array for a manufacturing facility, significantly reducing their carbon footprint and energy expenditure.'
                },
                {
                  category: 'commercial',
                  image: '/assets/images/product-3.jpg',
                  title: 'Office Complex, 50kW System',
                  description: 'Provided a 50kW solar solution for a multi-tenant office building, offering green energy to businesses.'
                },
                {
                  category: 'residential',
                  image: '/assets/images/gallery.jpg',
                  title: 'Remote Farm Power Solution',
                  description: 'Designed and implemented a complete off-grid solar and battery storage system for an agricultural farm.'
                }
              ]
                .filter(project => activeFilter === 'all' || project.category === activeFilter)
                .map((project, index) => (
                  <div 
                    key={`${project.category}-${index}`}
                    className="item-card project-item reveal-on-scroll"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                    />
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* Get a Quote Section */}
        <section id="get-quote" className="form-section section-padding bg-light">
          <div className="container reveal-on-scroll">
            <h3>Get Your Free Solar Quote Today!</h3>
            <form onSubmit={handleQuoteSubmit} className="quote-form" id="solar-quote-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="solar-name">Full Name:</label>
                  <input 
                    type="text" 
                    id="solar-name" 
                    name="name" 
                    value={quoteFormData.name}
                    onChange={handleQuoteInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="solar-email">Email Address:</label>
                  <input 
                    type="email" 
                    id="solar-email" 
                    name="email" 
                    value={quoteFormData.email}
                    onChange={handleQuoteInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="solar-phone">Phone Number:</label>
                  <input 
                    type="tel" 
                    id="solar-phone" 
                    name="phone" 
                    value={quoteFormData.phone}
                    onChange={handleQuoteInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="solar-address">Installation Address/City:</label>
                  <input 
                    type="text" 
                    id="solar-address" 
                    name="address" 
                    value={quoteFormData.address}
                    onChange={handleQuoteInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="solar-system-type">System Type Interest:</label>
                <select 
                  id="solar-system-type" 
                  name="system_type"
                  value={quoteFormData.system_type}
                  onChange={handleQuoteInputChange}
                >
                  <option value="">-- Select Type --</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="off-grid">Off-Grid</option>
                  <option value="on-grid">On-Grid</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="solar-message">Briefly Describe Your Needs:</label>
                <textarea
                  id="solar-message"
                  name="message"
                  rows="5"
                  value={quoteFormData.message}
                  onChange={handleQuoteInputChange}
                  placeholder="E.g., average monthly bill, roof type, energy goals..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="solar-file-upload">
                  Upload Bill/Site Plan (Optional, PDF/JPG/PNG):
                </label>
                <input
                  type="file"
                  id="solar-file-upload"
                  name="file_upload"
                  onChange={handleQuoteInputChange}
                  accept=".jpg, .jpeg, .png, .pdf"
                />
              </div>
              <button type="submit" className="btn btn-primary">Request Solar Quote</button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section id="solar-blog" className="blog-list section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Latest Solar Insights</h2>
            <div className="item-grid">
              <article className="blog-post-preview item-card reveal-on-scroll">
                <h4>
                  <a href="https://google.com">Top 5 Benefits of Switching to Solar Energy in 2024</a>
                </h4>
                <p className="post-meta">
                  Published on: July 20, 2023 | By: Grand-PE Solar Team
                </p>
                <p>
                  Discover how solar energy can significantly reduce your electricity bills,
                  increase property value, and contribute to a greener planet...
                </p>
                <a href="https://google.com" className="btn btn-secondary btn-sm">Read More</a>
              </article>
              <article className="blog-post-preview item-card reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
                <h4>
                  <a href="https://google.com">Understanding On-Grid vs. Off-Grid Solar Systems</a>
                </h4>
                <p className="post-meta">
                  Published on: July 15, 2023 | By: Grand-PE Solar Experts
                </p>
                <p>
                  Which solar system is right for your needs? We break down the key
                  differences, advantages, and considerations for each type...
                </p>
                <a href="https://google.com" className="btn btn-secondary btn-sm">Read More</a>
              </article>
              <article className="blog-post-preview item-card reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
                <h4>
                  <a href="https://google.com">Maximizing Your Solar Investment: Maintenance Tips</a>
                </h4>
                <p className="post-meta">
                  Published on: July 10, 2023 | By: Grand-PE Solar Care
                </p>
                <p>
                  Learn simple yet effective maintenance practices to ensure your solar
                  panel system operates at peak efficiency for decades...
                </p>
                <a href="https://google.com" className="btn btn-secondary btn-sm">Read More</a>
              </article>
            </div>
            <div className="text-center reveal-on-scroll blog-cta">
              <button type="button" className="btn btn-primary">Visit Our Solar Blog</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <h4>Grand-PE Global Limited</h4>
              <p>
                Empowering progress through diverse expertise and sustainable solutions for
                a brighter future.
              </p>
              <div className="contact-info">
                <p>
                  <i className="fas fa-map-marker-alt"></i> Suit A14, 36 Old Aba Road, Port
                  Harcourt, Nigeria.
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  <a href="tel:+2348064013822">+2348064013822</a>
                </p>
                <p>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:mailtograndpe@gmail.com">mailtograndpe@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="footer-section quick-links">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/solar">Grand-PE Solar</Link></li>
                <li><Link to="/tech">Grand-PE Tech</Link></li>
                <li><Link to="/translate">Grand-PE Translate</Link></li>
                <li><Link to="/plants">Grand-PE Plants & Export</Link></li>
                <li><button type="button" className="link-button">Blog</button></li>
                <li><button type="button" className="link-button">Privacy Policy</button></li>
                <li><button type="button" className="link-button">Terms of Service</button></li>
              </ul>
            </div>
            <div className="footer-section newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for the latest news and offers.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn btn-secondary">Subscribe</button>
              </form>
              {newsletterStatus && (
                <p className={`form-status ${newsletterStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {newsletterStatus}
                </p>
              )}
            </div>
            <div className="footer-section social-media">
              <h4>Connect With Us</h4>
              <div className="social-media-icons">
                <a
                  href="https://facebook.com/share/1Yr3kRXZ97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://instagram.com/grandpe_solar?utm_source=qr&igsh=ZDJ4eGh4cDU5ZWhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://wa.me/+2348064013822"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
              <p style={{ marginTop: 15 }}>Company Reg: RC.8316278</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © <span id="currentYear"></span> Grand-PE Global Limited. All Rights Reserved.
              Website by Grand-PE Tech.
            </p>
          </div>
        </div>
      </footer>

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

export default SolarPage;