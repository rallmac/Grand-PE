import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import { FooterGrandpe } from "../components/FooterGrandpe";
 
function TechPage() {
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
    company: '',
    service_type: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Carousel slides data
  const heroSlides = [
    {
      image: "/assets/images/GRAND_PE_TECH.png",
      title: "Web & Mobile Development",
      description: "Cutting-edge web applications and mobile apps that drive business growth."
    },
    {
      image: "/assets/images/GRAND_PE_TECH.jpg", 
      title: "Custom Software Solutions",
      description: "Tailored software solutions designed to meet your unique business needs."
    },
    {
      image: "/assets/images/carousel-1.jpg",
      title: "Cloud & DevOps Services", 
      description: "Scalable cloud infrastructure and streamlined deployment processes."
    },
    {
      image: "/assets/images/carousel-2.jpg",
      title: "IT Consulting & Support",
      description: "Expert guidance and ongoing support for all your technology initiatives."
    }
  ];

  // Initialize page effects
  useEffect(() => {
    // Set current year
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

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
  }, []);

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
    const { name, value } = e.target;
    setQuoteFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!quoteFormData.name || !quoteFormData.email || !quoteFormData.service_type) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteFormData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    setFormStatus('Thank you! Your project inquiry has been submitted. We\'ll contact you within 24 hours.');
    setQuoteFormData({
      name: '', email: '', phone: '', company: '', service_type: '', message: '', budget: '', timeline: ''
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
              <li><Link to="/solar" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" className="active" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section for Tech */}
        <section className="hero business-page-hero">
          <div className="hero-carousel" id="tech-hero-carousel">
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
            "Empowering Innovation — Smart Tech, Smarter Future."
          </p>
        </div>

        {/* Services Section */}
        <section id="tech-services" className="services-section section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">
              Our Technology Services
            </h2>
            <div className="item-grid">
              {[
                { icon: 'fa-code', title: 'Web Development', description: 'Modern, responsive websites and web applications built with the latest technologies including React, Node.js, and cloud platforms.' },
                { icon: 'fa-mobile-alt', title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.' },
                { icon: 'fa-cogs', title: 'Custom Software Solutions', description: 'Tailored software development to solve your unique business challenges and streamline operations.' },
                { icon: 'fa-cloud', title: 'Cloud & DevOps', description: 'Cloud migration, infrastructure setup, and DevOps practices to ensure scalable and reliable systems.' },
                { icon: 'fa-database', title: 'Database Solutions', description: 'Database design, optimization, and management for efficient data storage and retrieval.' },
                { icon: 'fa-shield-alt', title: 'Cybersecurity', description: 'Comprehensive security assessments and implementation to protect your digital assets.' }
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

        {/* Technologies Section */}
        <section id="tech-stack" className="section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Technologies We Master</h2>
            <div className="tech-categories reveal-on-scroll">
              <div className="tech-category">
                <h3>Frontend</h3>
                <div className="tech-items">
                  <span className="tech-item">React</span>
                  <span className="tech-item">Vue.js</span>
                  <span className="tech-item">Angular</span>
                  <span className="tech-item">TypeScript</span>
                  <span className="tech-item">JavaScript</span>
                  <span className="tech-item">HTML5/CSS3</span>
                </div>
              </div>
              <div className="tech-category">
                <h3>Backend</h3>
                <div className="tech-items">
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">Python</span>
                  <span className="tech-item">Java</span>
                  <span className="tech-item">PHP</span>
                  <span className="tech-item">C#</span>
                  <span className="tech-item">Go</span>
                </div>
              </div>
              <div className="tech-category">
                <h3>Mobile</h3>
                <div className="tech-items">
                  <span className="tech-item">React Native</span>
                  <span className="tech-item">Flutter</span>
                  <span className="tech-item">Swift</span>
                  <span className="tech-item">Kotlin</span>
                  <span className="tech-item">Xamarin</span>
                </div>
              </div>
              <div className="tech-category">
                <h3>Cloud & DevOps</h3>
                <div className="tech-items">
                  <span className="tech-item">AWS</span>
                  <span className="tech-item">Azure</span>
                  <span className="tech-item">Google Cloud</span>
                  <span className="tech-item">Docker</span>
                  <span className="tech-item">Kubernetes</span>
                  <span className="tech-item">CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <section id="tech-projects" className="projects-gallery section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Tech Projects Showcase</h2>
            <p className="lead text-center reveal-on-scroll project-gallery-intro">
              Explore some of our successfully delivered technology projects across various industries.
            </p>
            <div className="filter-buttons text-center reveal-on-scroll">
              {['all', 'web', 'mobile', 'software'].map((filter) => (
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
                  category: 'web',
                  image: '/assets/images/GRAND_PE_TECH.png',
                  title: 'E-Commerce Platform',
                  description: 'Full-stack e-commerce solution with React frontend and Node.js backend, serving thousands of users.'
                },
                {
                  category: 'mobile',
                  image: '/assets/images/product-3.jpg',
                  title: 'Healthcare Mobile App',
                  description: 'Cross-platform mobile application for healthcare management with real-time data synchronization.'
                },
                {
                  category: 'software',
                  image: '/assets/images/gallery-1.jpg',
                  title: 'Inventory Management System',
                  description: 'Custom software solution for warehouse management with barcode scanning and reporting features.'
                },
                {
                  category: 'web',
                  image: '/assets/images/gallery.jpg',
                  title: 'Corporate Website Redesign',
                  description: 'Modern, responsive website redesign with improved user experience and performance optimization.'
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
            <h3>Start Your Tech Project Today!</h3>
            <form onSubmit={handleQuoteSubmit} className="quote-form" id="tech-quote-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tech-name">Full Name:</label>
                  <input 
                    type="text" 
                    id="tech-name" 
                    name="name" 
                    value={quoteFormData.name}
                    onChange={handleQuoteInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tech-email">Email Address:</label>
                  <input 
                    type="email" 
                    id="tech-email" 
                    name="email" 
                    value={quoteFormData.email}
                    onChange={handleQuoteInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tech-phone">Phone Number:</label>
                  <input 
                    type="tel" 
                    id="tech-phone" 
                    name="phone" 
                    value={quoteFormData.phone}
                    onChange={handleQuoteInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tech-company">Company Name:</label>
                  <input 
                    type="text" 
                    id="tech-company" 
                    name="company" 
                    value={quoteFormData.company}
                    onChange={handleQuoteInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tech-service-type">Service Type:</label>
                  <select 
                    id="tech-service-type" 
                    name="service_type"
                    value={quoteFormData.service_type}
                    onChange={handleQuoteInputChange}
                    required
                  >
                    <option value="">-- Select Service --</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="custom-software">Custom Software</option>
                    <option value="cloud-devops">Cloud & DevOps</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tech-budget">Project Budget:</label>
                  <select 
                    id="tech-budget" 
                    name="budget"
                    value={quoteFormData.budget}
                    onChange={handleQuoteInputChange}
                  >
                    <option value="">-- Select Budget --</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tech-timeline">Project Timeline:</label>
                <select 
                  id="tech-timeline" 
                  name="timeline"
                  value={quoteFormData.timeline}
                  onChange={handleQuoteInputChange}
                >
                  <option value="">-- Select Timeline --</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3-months">1-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="6-plus-months">6+ Months</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tech-message">Project Description:</label>
                <textarea
                  id="tech-message"
                  name="message"
                  rows="5"
                  value={quoteFormData.message}
                  onChange={handleQuoteInputChange}
                  placeholder="Please describe your project requirements, goals, and any specific features you need..."
                />
              </div>
              <button type="submit" className="btn btn-primary">Request Tech Quote</button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section id="tech-blog" className="blog-list section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Latest Tech Insights</h2>
            <div className="item-grid">
              {[
                {
                  title: "10 Web Development Trends to Watch in 2024",
                  date: "September 25, 2024",
                  author: "Grand-PE Tech Team",
                  excerpt: "Discover the latest trends shaping the future of web development, from AI integration to advanced frameworks..."
                },
                {
                  title: "Mobile-First Design: Best Practices and Tips",
                  date: "September 20, 2024", 
                  author: "Grand-PE UX Team",
                  excerpt: "Learn how to create exceptional mobile experiences with our comprehensive guide to mobile-first design..."
                },
                {
                  title: "Cloud Migration: A Complete Guide for Businesses",
                  date: "September 15, 2024",
                  author: "Grand-PE Cloud Experts", 
                  excerpt: "Everything you need to know about migrating your business to the cloud, including strategies and best practices..."
                }
              ].map((post, index) => (
                <article 
                  key={index}
                  className="blog-post-preview item-card reveal-on-scroll" 
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <h4>
                    <a href="https://google.com">{post.title}</a>
                  </h4>
                  <p className="post-meta">
                    Published on: {post.date} | By: {post.author}
                  </p>
                  <p>{post.excerpt}</p>
                  <a href="https://google.com" className="btn btn-secondary btn-sm">Read More</a>
                </article>
              ))}
            </div>
            <div className="text-center reveal-on-scroll blog-cta">
              <button type="button" className="btn btn-primary">Visit Our Tech Blog</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      < FooterGrandpe />
      <a href="https://wa.me/+2348064013822" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}

export default TechPage;