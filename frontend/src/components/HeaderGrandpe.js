import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/style.css";


export function HeaderGrandpe(){
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


	return (
		<>
		{/* Header */}
		<header className="main-header">
		<div className="container">
		<Link to="/" className="logo">
  		<img
         src={
            location.pathname === "/solar"
            ? "/assets/images/GRAND_PE_SOLAR_LOGO.png"
            : "/assets/images/GRAND_PE_LOGO.png"
         }
         alt="Grand-PE Logo"
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
              <li><Link to="/" className="active" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/solar" onClick={() => setIsMobileMenuOpen(false)}>Solar</Link></li>
              <li><Link to="/tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link></li>
              <li><Link to="/translate" onClick={() => setIsMobileMenuOpen(false)}>Translate</Link></li>
              <li><Link to="/plants" onClick={() => setIsMobileMenuOpen(false)}>Plants & Export</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Spacer to prevent content from hiding under the fixed header */}
      <div style={{ height: '90px' }} aria-hidden="true" />
      </>
      )
}
