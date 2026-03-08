import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [formStatus, setFormStatus] = useState("");

  // Set current year and initialize scroll reveal
  useEffect(() => {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Initialize Intersection Observer for scroll reveal
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

      // Cleanup observer on unmount
      return () => {
        revealElements.forEach((el) => {
          revealObserver.unobserve(el);
        });
      };
    }
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setFormStatus("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    setFormStatus("Thank you for subscribing!");
    setFormData({ email: "" });
    
    // Clear status message after 3 seconds
    setTimeout(() => {
      setFormStatus("");
    }, 3000);
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
              <li><Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" className="active" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/solar" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Page Banner */}
        <section
          className="page-banner"
          style={{
            backgroundImage: "url('/assets/images/about.jpg')",
          }}
        >
          <div className="container">
            <h1 className="reveal-on-scroll">About Grand-PE Global Limited</h1>
          </div>
        </section>

        {/* Overview Section */}
        <section className="about-overview section-padding">
          <div className="container reveal-on-scroll">
            <h2>Our Story</h2>
            <p className="lead">
              Grand-PE Global Limited is a dynamic and forward-thinking conglomerate
              dedicated to delivering exceptional value across diverse sectors. Founded on
              the principles of integrity, innovation, and customer-centricity, we have
              grown into a trusted name for comprehensive solutions in solar energy,
              advanced technology, professional language services, and quality agricultural
              exports.
            </p>
            <p>
              Our journey began with a vision to empower communities and industries by
              providing accessible, sustainable, and cutting-edge products and services. We
              believe in making a tangible, positive impact, leveraging our expertise to
              drive progress and foster growth. Each arm of Grand-PE Global operates with a
              commitment to excellence, ensuring that we not only meet but exceed the
              expectations of our clients and partners worldwide.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mission-vision section-padding bg-light">
          <div className="container">
            <div className="mission-vision-grid reveal-on-scroll">
              <div className="mission-card">
                <h2>Our Mission</h2>
                <p>
                  To be a catalyst for progress by delivering superior, innovative, and
                  sustainable solutions across our diverse business operations, consistently
                  exceeding client expectations and contributing positively to global
                  development.
                </p>
              </div>
              <div className="vision-card">
                <h2>Our Vision</h2>
                <p>
                  To be a globally recognized leader and preferred partner, renowned for our
                  unwavering commitment to excellence, ethical practices, and transformative
                  impact in the solar, technology, language, and agricultural export
                  sectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="core-values section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Core Values</h2>
            <ul className="values-grid reveal-on-scroll">
              <li className="value-item">
                <strong>Integrity:</strong> Upholding the highest ethical standards in all
                our interactions and operations.
              </li>
              <li className="value-item">
                <strong>Innovation:</strong> Continuously seeking creative and advanced
                solutions to meet evolving needs.
              </li>
              <li className="value-item">
                <strong>Customer Focus:</strong> Placing our clients at the center of
                everything we do, ensuring their satisfaction.
              </li>
              <li className="value-item">
                <strong>Sustainability:</strong> Committing to environmentally and socially
                responsible practices for a better future.
              </li>
              <li className="value-item">
                <strong>Excellence:</strong> Striving for the highest quality and
                performance in our products and services.
              </li>
              <li className="value-item">
                <strong>Collaboration:</strong> Fostering teamwork and strategic
                partnerships to achieve shared success.
              </li>
            </ul>
          </div>
        </section>

        {/* Leadership and Commitment Section */}
        <section className="leadership-commitment section-padding bg-light">
          <div className="container reveal-on-scroll">
            <h2>Leadership and Commitment</h2>
            <p>
              Our leadership team comprises seasoned professionals with extensive experience
              and a shared dedication to Grand-PE Global Limited's strategic objectives. We
              are profoundly committed to investing in our people, refining our processes,
              and adopting state-of-the-art technology to ensure we remain at the forefront
              of our respective industries. This commitment extends to the communities we
              serve, where we actively seek to contribute to socio-economic development
              through responsible and impactful business practices.
            </p>
            {/* You can add profiles of key leaders here if desired using the item-card or a similar structure */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonial-preview section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Client Testimonials</h2>
            <div className="testimonial reveal-on-scroll">
              <p>
                "Grand-PE Solar provided an outstanding service, from consultation to
                installation. Our energy bills have significantly reduced!"
              </p>
              <p>- Happy Homeowner</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <p>
                "The tech team at Grand-PE developed a fantastic app for our business.
                Highly recommend their expertise."
              </p>
              <p>- Startup CEO</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <p>
                "The ASL interpretation services for our international conference were
                professional and seamless. Thank you Grand-PE Translate!"
              </p>
              <p>- Event Organizer Pro</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.3s" }}>
              <p>
                "We've been sourcing agricultural products through Grand-PE Plants & Export
                for years. Their quality and reliability are unmatched."
              </p>
              <p>- International Buyer Foods Inc.</p>
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <button type="submit" className="btn btn-secondary">Subscribe</button>
              </form>
              {formStatus && (
                <p className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {formStatus}
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

export default AboutPage;