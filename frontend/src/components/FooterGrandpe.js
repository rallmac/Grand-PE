import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";


export function FooterGrandpe(){
  
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
                {/*<p>
                  <i className="fas fa-phone"></i>
                  <a href="tel:+2348064013822">+2348064013822</a>
                </p>
                <p>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:mailtograndpe@gmail.com">mailtograndpe@gmail.com</a>
                </p> */}
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
    )
}