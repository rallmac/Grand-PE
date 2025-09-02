import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function HomePage() {
  React.useEffect(() => {
    // Set current year in footer
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    // Optionally, import and run carousel JS here if needed
  }, []);

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
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-carousel" id="homepage-hero-carousel">
            <div className="hero-slides-wrapper">
              {/* Slide 1: Grand-PE Solar */}
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/carousel-1.jpg')",
                }}
              >
                <div className="hero-content reveal-on-scroll">
                  <h1>Grand-PE Solar</h1>
                  <p>
                    From Homes to Industries, We Light the Way — Seamless Solar Solutions for All.
                  </p>
                  <Link to="/solar" className="btn btn-accent">Explore Solar</Link>
                </div>
              </div>
              {/* Slide 2: Grand-PE Tech */}
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/GRAND_PE_TECH.png')",
                }}
              >
                <div className="hero-content">
                  <h1>Grand-PE Tech</h1>
                  <p>Empowering Innovation — Smart Tech, Smarter Future.</p>
                  <Link to="/tech" className="btn btn-accent">Discover Tech</Link>
                </div>
              </div>
              {/* Slide 3: Grand-PE Translate */}
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/GRAND_PE_TRANSLATE.jpg')",
                }}
              >
                <div className="hero-content">
                  <h1>Grand-PE Translate</h1>
                  <p>Bridging Voices — Empowering Communication Through Sign and Speech.</p>
                  <Link to="/translate" className="btn btn-accent">Our Services</Link>
                </div>
              </div>
              {/* Slide 4: Grand-PE Plants & Export */}
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/aloe-vera-plant-sample.jpg')",
                }}
              >
                <div className="hero-content">
                  <h1>Grand-PE Plants & Export</h1>
                  <p>From Native Soil to Global Shelves.</p>
                  <Link to="/plants" className="btn btn-accent">View Products</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-nav">
            <button className="prev-btn" aria-label="Previous Slide">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="next-btn" aria-label="Next Slide">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="carousel-indicators"></div>
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
                <i className="fas fa-solar-panel"></i>
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
                <i className="fas fa-laptop-code"></i>
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
                <i className="fas fa-american-sign-language-interpreting"></i>
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
                <i className="fas fa-leaf"></i>
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
              <form className="newsletter-form" action="#" method="POST">
                <input type="email" name="email" placeholder="Enter your email" required />
                <button type="submit" className="btn btn-secondary">Subscribe</button>
              </form>
            </div>
            <div className="footer-section social-media">
              <h4>Connect With Us</h4>
              <div className="social-media-icons">
                <a
                  href="https://facebook.com/share/1Yr3kRXZ97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                ><i className="fab fa-facebook-f"></i></a>
                <a
                  href="https://instagram.com/grandpe_solar?utm_source=qr&igsh=ZDJ4eGh4cDU5ZWhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                ><i className="fab fa-instagram"></i></a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                ><i className="fab fa-linkedin-in"></i></a>
                <a
                  href="https://wa.me/+2348064013822"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                ><i className="fab fa-whatsapp"></i></a>
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

export default HomePage;