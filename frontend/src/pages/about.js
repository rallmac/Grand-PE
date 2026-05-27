import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import { FooterGrandpe } from "../components/FooterGrandpe";
import { HeaderGrandpe } from "../components/HeaderGrandpe";
import { Testimonials } from "../components/Testimonials";

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
    }, 3002);
  };

  return (
    <>
      {/* Header */}
      <HeaderGrandpe />

      {/* Body of page */}
      <main>
        {/* Page Banner */}
        <div className="bg-gray-100 mt-4 md:mt-6 py-4 px-3 md:px-6">
          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl">

            <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[340px]">
              
              {/* Image */}
              <img
                src="/assets/images/about.jpg"
                alt="About Grand-PE"
                className="w-full h-full object-cover object-center"
              />

              {/* Even dim overlay (no directional gradient) */}
              <div className="absolute inset-0 bg-black/70" />

              {/* Content (CENTERED) */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="text-white px-6 md:px-10 max-w-2xl reveal-on-scroll">
                  
                  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                    About Grand-PE Global Limited
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg font-semibold opacity-95">
                    Delivering excellence across solar energy, technology, communication,
                    and global trade — empowering businesses and communities for a smarter future.
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="about-overview">
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
        <Testimonials />
      </main>

      {/*Footer*/}
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

export default AboutPage;