import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function PlantsPage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form states
  const [inquiryFormData, setInquiryFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product_type: '',
    product_category: '',
    quantity: '',
    destination_country: '',
    shipping_method: '',
    timeline: '',
    message: ''
  });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Product filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Hero slides for plants/export
  const heroSlides = [
    {
      image: '/assets/images/aloe-vera-plant-sample.jpg',
      title: 'Premium Plant Exports',
      description: 'Quality medicinal and agricultural plants sourced and exported worldwide with sustainable practices.'
    },
    {
      image: '/assets/images/gallery-1.jpg',
      title: 'Global Agricultural Trade',
      description: 'Connecting international markets with Nigeria\'s finest agricultural products and herbal medicines.'
    },
    {
      image: '/assets/images/product-3.jpg',
      title: 'Sustainable Agriculture',
      description: 'Promoting eco-friendly farming practices and sustainable plant cultivation for global export.'
    },
    {
      image: '/assets/images/gallery.jpg',
      title: 'Quality Assurance',
      description: 'Rigorous quality control and certification processes ensuring premium products reach global markets.'
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
  const handleInquiryInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('Thank you for your inquiry! We will contact you within 24 hours to discuss your export needs.');
    setTimeout(() => setFormStatus(''), 5000);
    // Reset form
    setInquiryFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      product_type: '',
      product_category: '',
      quantity: '',
      destination_country: '',
      shipping_method: '',
      timeline: '',
      message: ''
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('Thank you for subscribing to our agricultural newsletter!');
    setTimeout(() => setNewsletterStatus(''), 4000);
    setNewsletterEmail('');
  };

  useEffect(() => {
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
  }, []);

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
              <li><Link to="/solar" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" className="active" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section for Plants */}
        <section className="hero business-page-hero">
          <div className="hero-carousel" id="plants-hero-carousel">
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
            "From Nigeria's Rich Soil to Global Markets — Sustainable Agriculture for Tomorrow."
          </p>
        </div>

        {/* Export Services Section */}
        <section id="export-services" className="services-section section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">
              Our Agricultural Export Services
            </h2>
            <div className="item-grid">
              {[
                { icon: 'fa-leaf', title: 'Medicinal Plants', description: 'Premium quality aloe vera, moringa, ginger, turmeric, and other medicinal plants certified for international markets.' },
                { icon: 'fa-seedling', title: 'Agricultural Products', description: 'Fresh produce, grains, legumes, and processed agricultural products meeting global quality standards.' },
                { icon: 'fa-shipping-fast', title: 'Global Logistics', description: 'Complete shipping and logistics solutions including packaging, documentation, and international freight services.' },
                { icon: 'fa-certificate', title: 'Quality Certification', description: 'Rigorous quality control with international certifications including organic, FDA, and export compliance documentation.' },
                { icon: 'fa-handshake', title: 'Trade Partnerships', description: 'Building lasting relationships with international buyers, distributors, and agricultural trade organizations worldwide.' },
                { icon: 'fa-globe', title: 'Market Intelligence', description: 'Market research and intelligence services to identify opportunities and trends in global agricultural markets.' }
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

        {/* Products Showcase Section */}
        <section id="products" className="section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Export Products</h2>
            <div className="product-filter reveal-on-scroll">
              <button 
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'medicinal' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('medicinal')}
              >
                Medicinal Plants
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'agricultural' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('agricultural')}
              >
                Agricultural
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'processed' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('processed')}
              >
                Processed
              </button>
            </div>
            
            <div className="product-gallery">
              {[
                { category: 'medicinal', image: '/assets/images/aloe-vera-plant-sample.jpg', name: 'Aloe Vera', description: 'Premium organic aloe vera plants and extracts for pharmaceutical and cosmetic industries.' },
                { category: 'medicinal', image: '/assets/images/product-3.jpg', name: 'Moringa', description: 'Nutrient-rich moringa leaves, seeds, and powder certified for international health markets.' },
                { category: 'agricultural', image: '/assets/images/gallery-1.jpg', name: 'Yams & Cassava', description: 'High-quality root vegetables and tubers processed for global food distribution.' },
                { category: 'agricultural', image: '/assets/images/gallery.jpg', name: 'Palm Products', description: 'Sustainable palm oil, kernel oil, and palm wine products meeting international standards.' },
                { category: 'processed', image: '/assets/images/about.jpg', name: 'Dried Herbs', description: 'Carefully processed and packaged dried herbs and spices for culinary and medicinal use.' },
                { category: 'processed', image: '/assets/images/carousel-1.jpg', name: 'Plant Extracts', description: 'Concentrated plant extracts and essential oils for pharmaceutical and cosmetic applications.' }
              ].filter(product => selectedCategory === 'all' || product.category === selectedCategory).map((product, index) => (
                <div 
                  key={index}
                  className="product-card reveal-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <span className="product-category">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Export Process Section */}
        <section id="export-process" className="section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Export Process</h2>
            <div className="process-timeline">
              {[
                { step: '01', title: 'Inquiry & Assessment', description: 'Initial consultation to understand your specific product requirements and target markets.' },
                { step: '02', title: 'Sourcing & Quality Control', description: 'Careful sourcing from certified farms with rigorous quality testing and documentation.' },
                { step: '03', title: 'Certification & Documentation', description: 'Obtaining all necessary export permits, phytosanitary certificates, and quality certifications.' },
                { step: '04', title: 'Processing & Packaging', description: 'Professional processing and packaging according to international standards and customer specifications.' },
                { step: '05', title: 'Shipping & Logistics', description: 'Coordinated shipping via air, sea, or land with complete tracking and insurance coverage.' },
                { step: '06', title: 'Delivery & Support', description: 'Timely delivery to destination with ongoing customer support and relationship management.' }
              ].map((process, index) => (
                <div 
                  key={index}
                  className="process-step reveal-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="step-number">{process.step}</div>
                  <div className="step-content">
                    <h4>{process.title}</h4>
                    <p>{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Export Inquiry Form Section */}
        <section id="export-inquiry" className="form-section section-padding bg-light">
          <div className="container reveal-on-scroll">
            <h3>Request Export Quote</h3>
            <form onSubmit={handleInquirySubmit} className="quote-form" id="plants-inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plants-name">Full Name:</label>
                  <input 
                    type="text" 
                    id="plants-name" 
                    name="name" 
                    value={inquiryFormData.name}
                    onChange={handleInquiryInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="plants-email">Email Address:</label>
                  <input 
                    type="email" 
                    id="plants-email" 
                    name="email" 
                    value={inquiryFormData.email}
                    onChange={handleInquiryInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plants-phone">Phone Number:</label>
                  <input 
                    type="tel" 
                    id="plants-phone" 
                    name="phone" 
                    value={inquiryFormData.phone}
                    onChange={handleInquiryInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="plants-company">Company/Organization:</label>
                  <input 
                    type="text" 
                    id="plants-company" 
                    name="company" 
                    value={inquiryFormData.company}
                    onChange={handleInquiryInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plants-product-type">Product Type:</label>
                  <select 
                    id="plants-product-type" 
                    name="product_type"
                    value={inquiryFormData.product_type}
                    onChange={handleInquiryInputChange}
                    required
                  >
                    <option value="">-- Select Product Type --</option>
                    <option value="medicinal-plants">Medicinal Plants</option>
                    <option value="agricultural-products">Agricultural Products</option>
                    <option value="processed-foods">Processed Foods</option>
                    <option value="plant-extracts">Plant Extracts</option>
                    <option value="dried-herbs">Dried Herbs & Spices</option>
                    <option value="other">Other (specify in message)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="plants-category">Specific Product:</label>
                  <select 
                    id="plants-category" 
                    name="product_category"
                    value={inquiryFormData.product_category}
                    onChange={handleInquiryInputChange}
                  >
                    <option value="">-- Select Product --</option>
                    <option value="aloe-vera">Aloe Vera</option>
                    <option value="moringa">Moringa</option>
                    <option value="ginger">Ginger</option>
                    <option value="turmeric">Turmeric</option>
                    <option value="yams">Yams</option>
                    <option value="cassava">Cassava</option>
                    <option value="palm-products">Palm Products</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plants-quantity">Estimated Quantity:</label>
                  <select 
                    id="plants-quantity" 
                    name="quantity"
                    value={inquiryFormData.quantity}
                    onChange={handleInquiryInputChange}
                  >
                    <option value="">-- Select Quantity --</option>
                    <option value="sample">Sample Order (1-50kg)</option>
                    <option value="small">Small Order (50-500kg)</option>
                    <option value="medium">Medium Order (500kg-5 tons)</option>
                    <option value="large">Large Order (5+ tons)</option>
                    <option value="ongoing">Ongoing Supply Contract</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="plants-destination">Destination Country:</label>
                  <input 
                    type="text" 
                    id="plants-destination" 
                    name="destination_country" 
                    value={inquiryFormData.destination_country}
                    onChange={handleInquiryInputChange}
                    placeholder="e.g., United States, Germany, Japan"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plants-shipping">Preferred Shipping:</label>
                  <select 
                    id="plants-shipping" 
                    name="shipping_method"
                    value={inquiryFormData.shipping_method}
                    onChange={handleInquiryInputChange}
                  >
                    <option value="">-- Select Shipping Method --</option>
                    <option value="air-freight">Air Freight</option>
                    <option value="sea-freight">Sea Freight</option>
                    <option value="express-courier">Express Courier</option>
                    <option value="land-transport">Land Transport</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="plants-timeline">Timeline:</label>
                  <select 
                    id="plants-timeline" 
                    name="timeline"
                    value={inquiryFormData.timeline}
                    onChange={handleInquiryInputChange}
                  >
                    <option value="">-- Select Timeline --</option>
                    <option value="immediate">Immediate (1-2 weeks)</option>
                    <option value="short-term">Short Term (1 month)</option>
                    <option value="medium-term">Medium Term (2-3 months)</option>
                    <option value="long-term">Long Term (6+ months)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="plants-message">Additional Requirements:</label>
                <textarea
                  id="plants-message"
                  name="message"
                  rows="5"
                  value={inquiryFormData.message}
                  onChange={handleInquiryInputChange}
                  placeholder="Please provide details about specific quality requirements, certifications needed, packaging preferences, or any other special requirements..."
                />
              </div>
              <button type="submit" className="btn btn-primary">Request Export Quote</button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="plants-testimonials" className="testimonial-preview section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Client Success Stories</h2>
            {[
              {
                quote: "Grand-PE Global has been our reliable partner for aloe vera exports. Their quality control and documentation process is exceptional.",
                author: "International Cosmetics Distributor"
              },
              {
                quote: "The medicinal plant extracts we source through Grand-PE consistently meet our pharmaceutical standards. Excellent service.",
                author: "Pharmaceutical Company"
              },
              {
                quote: "Their agricultural export services helped us establish a steady supply chain for West African products in European markets.",
                author: "Food Distribution Company"
              },
              {
                quote: "Professional handling of all export documentation and certifications. We've been working together for over three years.",
                author: "Health Supplement Manufacturer"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial reveal-on-scroll" 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <p>"{testimonial.quote}"</p>
                <p>- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer - copy from about.js for consistency */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <h4>Grand-PE Global Limited</h4>
              <p>Empowering progress through diverse expertise...</p>
              <div className="contact-info">
                <p><i className="fas fa-map-marker-alt"></i> Suit A14, 36 Old Aba Road, Port Harcourt, Nigeria.</p>
                <p><i className="fas fa-phone"></i> <a href="tel:+2348064013822">+2348064013822</a></p>
                <p><i className="fas fa-envelope"></i> <a href="mailto:mailtograndpe@gmail.com">mailtograndpe@gmail.com</a></p>
              </div>
            </div>
            <div className="footer-section quick-links">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/solar">Solar</Link></li>
                <li><Link to="/tech">Tech</Link></li>
                <li><Link to="/translate">Translate</Link></li>
                <li><Link to="/plants">Plants</Link></li>
                <li><a href="https://www.linkedin.org">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section newsletter">
              <h4>Stay Updated</h4>
              <p>Get agricultural export news and opportunities.</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
              {newsletterStatus && (
                <div className={`newsletter-status ${newsletterStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {newsletterStatus}
                </div>
              )}
            </div>
            <div className="footer-section social-media">
              <h4>Connect</h4>
              <div className="social-media-icons">
                <a href="https://facebook.com/share/1Yr3kRXZ97/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://instagram.com/grandpe_solar?utm_source=qr&igsh=ZDJ4eGh4cDU5ZWhr" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.org" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://wa.me/+2348064013822" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              </div>
              <p>Company Reg: RC.8316278</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© <span id="currentYear"></span> Grand-PE Global. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <a href="https://wa.me/+2348064013822" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}

export default PlantsPage;