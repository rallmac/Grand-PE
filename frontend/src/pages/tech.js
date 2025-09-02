import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function TechPage() {
  React.useEffect(() => {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }, []);

  return (
    <>
      <header className="main-header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/assets/images/GRAND_PE_GLOBAL_LIMITED.jpg" alt="Grand-PE Global Limited Logo" />
          </Link>
          <button className="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
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
        <section className="page-banner" style={{ backgroundImage: "url('/assets/images/GRAND_PE_TECH.png')" }}>
          <div className="container">
            <h1 className="reveal-on-scroll">Grand-PE Tech</h1>
          </div>
        </section>
        <section className="section-padding">
          <div className="container reveal-on-scroll">
            <h2>Smart Tech, Smarter Future</h2>
            <p>
              We deliver cutting-edge web and app development, software solutions, and IT consultancy.
              Our tech team is ready to help you innovate and grow.
            </p>
            <ul>
              <li>Web & Mobile App Development</li>
              <li>Custom Software Solutions</li>
              <li>IT Consulting</li>
              <li>Support & Maintenance</li>
            </ul>
            <img src="/assets/images/tech-banner.jpg" alt="Tech Solutions" style={{ maxWidth: "100%", marginTop: 20 }} />
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
              <p>Subscribe for news.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Email" required />
                <button type="submit">Subscribe</button>
              </form>
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

export default TechPage;