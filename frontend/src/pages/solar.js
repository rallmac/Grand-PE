import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function SolarPage() {
  React.useEffect(() => {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    // You can add carousel logic here using React state/effects or a library
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
            aria-expanded="false"
          >
            ☰
          </button>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
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
        {/* Hero Section for Solar */}
        <section className="hero business-page-hero">
          <div className="hero-carousel" id="solar-hero-carousel">
            <div className="hero-slides-wrapper">
              <div
                className="hero-slide active"
                style={{
                  backgroundImage: "url('/assets/images/GRAND_PE_SOLAR_LOGO.png')",
                }}
              >
                <div className="hero-content">
                  <h1>Residential Solar Installations</h1>
                  <p>Power your home with clean, reliable solar energy.</p>
                </div>
              </div>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/hero-solar-industrial-placeholder.jpg')",
                }}
              >
                <div className="hero-content">
                  <h1>Industrial & Commercial Solar</h1>
                  <p>Optimize energy costs for your business with large-scale solar.</p>
                </div>
              </div>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/hero-solar-products-placeholder.jpg')",
                }}
              >
                <div className="hero-content">
                  <h1>Quality Solar Products</h1>
                  <p>Top-tier panels, inverters, batteries, and mounting systems.</p>
                </div>
              </div>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: "url('/assets/images/hero-solar-services-placeholder.jpg')",
                }}
              >
                <div className="hero-content">
                  <h1>Comprehensive Solar Services</h1>
                  <p>From consultation to maintenance, we've got you covered.</p>
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
              <div className="item-card reveal-on-scroll">
                <img
                  src="/assets/images/solar-panel-product-placeholder.jpg"
                  alt="Solar Panels"
                />
                <h3>High-Efficiency Solar Panels</h3>
                <p>
                  We offer a range of monocrystalline and polycrystalline panels from
                  leading manufacturers, ensuring maximum power generation and durability.
                </p>
                <a href="#get-quote" className="btn btn-primary btn-sm">Get Details</a>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
                <img
                  src="/assets/images/solar-inverter-product-placeholder.jpg"
                  alt="Solar Inverters"
                />
                <h3>Advanced Solar Inverters</h3>
                <p>
                  Choose from string, micro, and hybrid inverters designed for optimal
                  energy conversion, reliability, and smart monitoring capabilities.
                </p>
                <a href="#get-quote" className="btn btn-primary btn-sm">Get Details</a>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
                <img
                  src="/assets/images/solar-battery-product-placeholder.jpg"
                  alt="Solar Batteries"
                />
                <h3>Energy Storage Batteries</h3>
                <p>
                  Secure your energy independence with our high-performance lithium-ion and
                  lead-acid batteries for backup power and off-grid systems.
                </p>
                <a href="#get-quote" className="btn btn-primary btn-sm">Get Details</a>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.3s" }}>
                <img
                  src="/assets/images/solar-accessories-product-placeholder.jpg"
                  alt="Solar Accessories"
                />
                <h3>Mounting & Accessories</h3>
                <p>
                  Durable mounting structures, high-quality cables, connectors, and advanced
                  monitoring systems to complete your solar setup.
                </p>
                <a href="#get-quote" className="btn btn-primary btn-sm">Get Details</a>
              </div>
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
              <div className="item-card reveal-on-scroll">
                <i className="fas fa-home fa-2x" style={{ color: "var(--secondary-color)", marginBottom: 15 }}></i>
                <h3>Residential Solar Systems</h3>
                <p>
                  Custom-designed solar solutions for homes, reducing electricity bills and
                  promoting sustainable living. Includes consultation, installation, and
                  support.
                </p>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
                <i className="fas fa-industry fa-2x" style={{ color: "var(--secondary-color)", marginBottom: 15 }}></i>
                <h3>Commercial & Industrial Solar</h3>
                <p>
                  Large-scale solar installations for businesses, factories, and
                  agricultural enterprises to lower operational costs and enhance green
                  credentials.
                </p>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
                <i className="fas fa-plug fa-2x" style={{ color: "var(--secondary-color)", marginBottom: 15 }}></i>
                <h3>Off-Grid & On-Grid Solutions</h3>
                <p>
                  Expert design and implementation of both grid-tied systems for energy
                  savings and standalone off-grid systems for remote power needs.
                </p>
              </div>
              <div className="item-card reveal-on-scroll" style={{ transitionDelay: "0.3s" }}>
                <i className="fas fa-tools fa-2x" style={{ color: "var(--secondary-color)", marginBottom: 15 }}></i>
                <h3>Maintenance & Support</h3>
                <p>
                  Proactive maintenance plans, system monitoring, and responsive support
                  services to ensure your solar investment performs optimally for years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <section id="solar-projects" className="projects-gallery section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">Our Solar Projects Showcase</h2>
            <p
              className="lead text-center reveal-on-scroll"
              style={{
                maxWidth: 700,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 40,
              }}
            >
              Explore some of our successfully completed solar installations, delivering
              clean energy and significant savings.
            </p>
            <div className="filter-buttons text-center reveal-on-scroll" style={{ marginBottom: 30 }}>
              <button className="btn btn-sm btn-outline-primary active" data-filter="all">
                All
              </button>
              <button className="btn btn-sm btn-outline-primary" data-filter="residential">
                Residential
              </button>
              <button className="btn btn-sm btn-outline-primary" data-filter="commercial">
                Commercial
              </button>
              <button className="btn btn-sm btn-outline-primary" data-filter="industrial">
                Industrial
              </button>
            </div>
            <div className="item-grid project-grid">
              <div className="item-card project-item reveal-on-scroll" data-category="residential">
                <img
                  src="/assets/images/project-solar-resi-1-placeholder.jpg"
                  alt="Residential Solar Project 1"
                />
                <h4>Suburban Home, 10kW System</h4>
                <p>
                  Empowered a modern family home with a 10kW rooftop solar system, achieving
                  80% energy independence.
                </p>
              </div>
              <div className="item-card project-item reveal-on-scroll" data-category="industrial" style={{ transitionDelay: "0.1s" }}>
                <img
                  src="/assets/images/project-solar-ind-1-placeholder.jpg"
                  alt="Industrial Solar Project 1"
                />
                <h4>Factory Rooftop, 100kW Array</h4>
                <p>
                  Installed a 100kW solar array for a manufacturing facility, significantly
                  reducing their carbon footprint and energy expenditure.
                </p>
              </div>
              <div className="item-card project-item reveal-on-scroll" data-category="commercial" style={{ transitionDelay: "0.2s" }}>
                <img
                  src="/assets/images/project-solar-comm-1-placeholder.jpg"
                  alt="Commercial Solar Project"
                />
                <h4>Office Complex, 50kW System</h4>
                <p>
                  Provided a 50kW solar solution for a multi-tenant office building,
                  offering green energy to businesses.
                </p>
              </div>
              <div className="item-card project-item reveal-on-scroll" data-category="residential" style={{ transitionDelay: "0.3s" }}>
                <img
                  src="/assets/images/project-solar-offgrid-1-placeholder.jpg"
                  alt="Off-Grid Solar Project"
                />
                <h4>Remote Farm Power Solution</h4>
                <p>
                  Designed and implemented a complete off-grid solar and battery storage
                  system for an agricultural farm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get a Quote Section */}
        <section id="get-quote" className="form-section section-padding bg-light">
          <div className="container reveal-on-scroll">
            <h3>Get Your Free Solar Quote Today!</h3>
            <form action="#" method="POST" className="quote-form" id="solar-quote-form">
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <label htmlFor="solar-name">Full Name:</label>
                  <input type="text" id="solar-name" name="name" required />
                </div>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <label htmlFor="solar-email">Email Address:</label>
                  <input type="email" id="solar-email" name="email" required />
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <label htmlFor="solar-phone">Phone Number:</label>
                  <input type="tel" id="solar-phone" name="phone" />
                </div>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <label htmlFor="solar-address">Installation Address/City:</label>
                  <input type="text" id="solar-address" name="address" required />
                </div>
              </div>
              <label htmlFor="solar-system-type">System Type Interest:</label>
              <select id="solar-system-type" name="system_type">
                <option value="">-- Select Type --</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="off-grid">Off-Grid</option>
                <option value="on-grid">On-Grid</option>
              </select>
              <label htmlFor="solar-message">Briefly Describe Your Needs:</label>
              <textarea
                id="solar-message"
                name="message"
                rows="5"
                placeholder="E.g., average monthly bill, roof type, energy goals..."
              ></textarea>
              <label htmlFor="solar-file-upload">
                Upload Bill/Site Plan (Optional, PDF/JPG/PNG):
              </label>
              <input
                type="file"
                id="solar-file-upload"
                name="file_upload"
                accept=".jpg, .jpeg, .png, .pdf"
              />
              <button type="submit" className="btn btn-primary">Request Solar Quote</button>
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
            <div className="text-center reveal-on-scroll" style={{ marginTop: 40 }}>
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
              <p>Empowering progress...</p>
              <div className="contact-info">
                <p>
                  <i className="fas fa-map-marker-alt"></i>Suit A14, 36 Old Aba Road, Port
                  Harcourt, Nigeria.
                </p>
                <p><i className="fas fa-phone"></i> <a href="tel:+2348064013822">+2348064013822</a></p>
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
                <li><Link to="/about">About</Link></li>
                <li><Link to="/solar">Solar</Link></li>
                <li><Link to="/tech">Tech</Link></li>
                <li><Link to="/translate">Translate</Link></li>
                <li><Link to="/plants">Plants</Link></li>
              </ul>
            </div>
            <div className="footer-section newsletter">
              <h4>Newsletter</h4>
              <p>Stay updated.</p>
              <form className="newsletter-form">
                <input type="email" required />
                <button type="submit">Sub</button>
              </form>
            </div>
            <div className="footer-section social-media">
              <h4>Connect</h4>
              <div className="social-media-icons">
                <a href="https://facebook.com/share/1Yr3kRXZ97/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/grandpe_solar?utm_source=qr&igsh=ZDJ4eGh4cDU5ZWhr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p>Company Reg: RC.8316278</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© <span id="currentYear"></span> Grand-PE Global. All Rights Reserved.</p>
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