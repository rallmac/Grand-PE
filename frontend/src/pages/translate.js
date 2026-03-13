import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import { FooterGrandpe } from "../components/FooterGrandpe";

function TranslatePage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form state
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service_type: '',
    language_pair: '',
    event_date: '',
    event_time: '',
    duration: '',
    location: '',
    message: '',
    participants: ''
  });
  const [formStatus, setFormStatus] = useState('');

  // Carousel slides data
  const heroSlides = [
    {
      image: "/assets/images/GRAND_PE_TRANSLATE.jpg",
      title: "ASL Interpretation Services",
      description: "Professional American Sign Language interpretation for all your communication needs."
    },
    {
      image: "/assets/images/GRAND_PE_TRANSLATE.png", 
      title: "Conference & Event Interpretation",
      description: "Seamless multilingual interpretation services for conferences, meetings, and events."
    },
    {
      image: "/assets/images/about.jpg",
      title: "Document Translation", 
      description: "Accurate and culturally appropriate translation of documents in multiple languages."
    },
    {
      image: "/assets/images/team-1.jpg",
      title: "Business Communication Solutions",
      description: "Breaking language barriers to facilitate effective business communication globally."
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

  // Form handling
  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.service_type || !bookingFormData.event_date) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingFormData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    setFormStatus('Thank you! Your service booking request has been submitted. We\'ll contact you within 24 hours to confirm details.');
    setBookingFormData({
      name: '', email: '', phone: '', organization: '', service_type: '', language_pair: '', 
      event_date: '', event_time: '', duration: '', location: '', message: '', participants: ''
    });
    
    setTimeout(() => setFormStatus(''), 5000);
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
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" className="active" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section for Translate */}
        <section className="hero business-page-hero">
          <div className="hero-carousel" id="translate-hero-carousel">
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
            "Bridging Voices — Empowering Communication Through Sign and Speech."
          </p>
        </div>

        {/* Services Section */}
        <section id="translate-services" className="services-section section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">
              Our Translation & Interpretation Services
            </h2>
            <div className="item-grid">
              {[
                { icon: 'fa-american-sign-language-interpreting', title: 'ASL Interpretation', description: 'Professional American Sign Language interpretation for conferences, meetings, medical appointments, and educational settings.' },
                { icon: 'fa-microphone', title: 'Simultaneous Interpretation', description: 'Real-time interpretation services for conferences and large events with professional booth setup and equipment.' },
                { icon: 'fa-comments', title: 'Consecutive Interpretation', description: 'Face-to-face interpretation for business meetings, legal proceedings, and personal consultations in multiple languages.' },
                { icon: 'fa-file-alt', title: 'Document Translation', description: 'Accurate translation of legal documents, business contracts, academic papers, and personal documents with certification.' },
                { icon: 'fa-users', title: 'Community Interpretation', description: 'Interpretation services for healthcare, social services, education, and legal settings to bridge communication gaps.' },
                { icon: 'fa-video', title: 'Remote Interpretation', description: 'Video and phone interpretation services for remote meetings, telemedicine, and virtual events worldwide.' }
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

        {/* Languages Section */}
        <section id="languages" className="section-padding bg-light">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Languages We Support</h2>
            <div className="language-categories reveal-on-scroll">
              <div className="language-category">
                <h3>Primary Languages</h3>
                <div className="language-items">
                  <span className="language-item">English</span>
                  <span className="language-item">American Sign Language (ASL)</span>
                  <span className="language-item">French</span>
                  <span className="language-item">Spanish</span>
                  <span className="language-item">Portuguese</span>
                </div>
              </div>
              <div className="language-category">
                <h3>Nigerian Languages</h3>
                <div className="language-items">
                  <span className="language-item">Efik</span>
                  <span className="language-item">Ibibio</span>
                  <span className="language-item">Igbo</span>
                  <span className="language-item">Yoruba</span>
                  <span className="language-item">Hausa</span>
                </div>
              </div>
              <div className="language-category">
                <h3>Other Languages</h3>
                <div className="language-items">
                  <span className="language-item">German</span>
                  <span className="language-item">Italian</span>
                  <span className="language-item">Arabic</span>
                  <span className="language-item">Chinese (Mandarin)</span>
                  <span className="language-item">Russian</span>
                </div>
              </div>
              <div className="language-category">
                <h3>Specialized Services</h3>
                <div className="language-items">
                  <span className="language-item">Medical Interpretation</span>
                  <span className="language-item">Legal Translation</span>
                  <span className="language-item">Business Communication</span>
                  <span className="language-item">Academic Translation</span>
                  <span className="language-item">Technical Documents</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="interpreter-team" className="section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Professional Interpreters</h2>
            <p className="lead text-center reveal-on-scroll project-gallery-intro">
              Meet our certified and experienced team of interpreters and translators.
            </p>
            <div className="item-grid team-grid">
              {[
                {
                  image: '/assets/images/team-1.jpg',
                  name: 'Sarah Johnson',
                  title: 'Senior ASL Interpreter',
                  specialization: 'Certified ASL interpreter with 10+ years experience in medical and legal settings.',
                  credentials: 'RID Certified, NIC Master'
                },
                {
                  image: '/assets/images/team-3.jpg',
                  name: 'Michael Chen',
                  title: 'Conference Interpreter',
                  specialization: 'Multilingual simultaneous interpreter specializing in business and technology conferences.',
                  credentials: 'AIIC Member, MA in Translation Studies'
                },
                {
                  image: '/assets/images/team-1.jpg',
                  name: 'Aisha Okafor',
                  title: 'Community Interpreter',
                  specialization: 'Expert in Nigerian languages and cultural mediation for healthcare and social services.',
                  credentials: 'Certified Healthcare Interpreter, Cultural Mediator'
                },
                {
                  image: '/assets/images/team-3.jpg',
                  name: 'David Martinez',
                  title: 'Document Translator',
                  specialization: 'Specialized in legal and business document translation with notarization services.',
                  credentials: 'ATA Certified, Sworn Translator'
                }
              ].map((member, index) => (
                <div 
                  key={index}
                  className="item-card team-member reveal-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                  />
                  <h4>{member.name}</h4>
                  <h5>{member.title}</h5>
                  <p>{member.specialization}</p>
                  <p className="credentials">{member.credentials}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Booking Section */}
        <section id="book-service" className="form-section section-padding bg-light">
          <div className="container reveal-on-scroll">
            <h3>Book Your Translation or Interpretation Service</h3>
            <form onSubmit={handleBookingSubmit} className="quote-form" id="translate-booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="translate-name">Full Name:</label>
                  <input 
                    type="text" 
                    id="translate-name" 
                    name="name" 
                    value={bookingFormData.name}
                    onChange={handleBookingInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="translate-email">Email Address:</label>
                  <input 
                    type="email" 
                    id="translate-email" 
                    name="email" 
                    value={bookingFormData.email}
                    onChange={handleBookingInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="translate-phone">Phone Number:</label>
                  <input 
                    type="tel" 
                    id="translate-phone" 
                    name="phone" 
                    value={bookingFormData.phone}
                    onChange={handleBookingInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="translate-organization">Organization/Company:</label>
                  <input 
                    type="text" 
                    id="translate-organization" 
                    name="organization" 
                    value={bookingFormData.organization}
                    onChange={handleBookingInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="translate-service-type">Service Type:</label>
                  <select 
                    id="translate-service-type" 
                    name="service_type"
                    value={bookingFormData.service_type}
                    onChange={handleBookingInputChange}
                    required
                  >
                    <option value="">-- Select Service --</option>
                    <option value="asl-interpretation">ASL Interpretation</option>
                    <option value="simultaneous-interpretation">Simultaneous Interpretation</option>
                    <option value="consecutive-interpretation">Consecutive Interpretation</option>
                    <option value="document-translation">Document Translation</option>
                    <option value="community-interpretation">Community Interpretation</option>
                    <option value="remote-interpretation">Remote Interpretation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="translate-language-pair">Language Pair:</label>
                  <select 
                    id="translate-language-pair" 
                    name="language_pair"
                    value={bookingFormData.language_pair}
                    onChange={handleBookingInputChange}
                  >
                    <option value="">-- Select Languages --</option>
                    <option value="english-asl">English ↔ ASL</option>
                    <option value="english-french">English ↔ French</option>
                    <option value="english-spanish">English ↔ Spanish</option>
                    <option value="english-efik">English ↔ Efik</option>
                    <option value="english-igbo">English ↔ Igbo</option>
                    <option value="english-yoruba">English ↔ Yoruba</option>
                    <option value="other">Other (specify in message)</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="translate-event-date">Event/Service Date:</label>
                  <input 
                    type="date" 
                    id="translate-event-date" 
                    name="event_date" 
                    value={bookingFormData.event_date}
                    onChange={handleBookingInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="translate-event-time">Event/Service Time:</label>
                  <input 
                    type="time" 
                    id="translate-event-time" 
                    name="event_time" 
                    value={bookingFormData.event_time}
                    onChange={handleBookingInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="translate-duration">Duration:</label>
                  <select 
                    id="translate-duration" 
                    name="duration"
                    value={bookingFormData.duration}
                    onChange={handleBookingInputChange}
                  >
                    <option value="">-- Select Duration --</option>
                    <option value="1-hour">1 Hour</option>
                    <option value="2-hours">2 Hours</option>
                    <option value="half-day">Half Day (4 hours)</option>
                    <option value="full-day">Full Day (8 hours)</option>
                    <option value="multi-day">Multi-day</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="translate-participants">Number of Participants:</label>
                  <input 
                    type="number" 
                    id="translate-participants" 
                    name="participants" 
                    value={bookingFormData.participants}
                    onChange={handleBookingInputChange}
                    min="1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="translate-location">Location/Venue:</label>
                <input 
                  type="text" 
                  id="translate-location" 
                  name="location" 
                  value={bookingFormData.location}
                  onChange={handleBookingInputChange}
                  placeholder="Event location or 'Remote' for online services"
                />
              </div>
              <div className="form-group">
                <label htmlFor="translate-message">Additional Details:</label>
                <textarea
                  id="translate-message"
                  name="message"
                  rows="5"
                  value={bookingFormData.message}
                  onChange={handleBookingInputChange}
                  placeholder="Please provide details about the event, specific requirements, technical terminology, or any special accommodations needed..."
                />
              </div>
              <button type="submit" className="btn btn-primary">Request Service Booking</button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="translate-testimonials" className="testimonial-preview section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">What Our Clients Say</h2>
            {[
              {
                quote: "The ASL interpretation services for our international conference were exceptional. The interpreters were professional, punctual, and incredibly skilled.",
                author: "Conference Organizer Pro"
              },
              {
                quote: "Grand-PE Translate helped us break down language barriers in our multicultural workplace. Their business interpretation services are top-notch.",
                author: "HR Director, Global Corp"
              },
              {
                quote: "The document translation was accurate and delivered on time. They maintained the technical precision required for our legal contracts.",
                author: "Legal Firm Partner"
              },
              {
                quote: "Remote interpretation services made our international meetings seamless. Highly professional team with excellent technical setup.",
                author: "International Business Manager"
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

      {/* Footer */}
      < FooterGrandpe />
      <a href="https://wa.me/+2348064013822" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}

export default TranslatePage;