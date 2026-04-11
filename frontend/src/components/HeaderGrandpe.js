import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../css/style.css";

export function HeaderGrandpe() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when link is clicked
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="main-header">
        <div className="container">

          {/* Logo */}
          <Link to="/" className="logo">
            <img
              src={
                location.pathname === "/solar"
                  ? "/assets/images/GRAND_PE_SOLAR_LOGO.png"
                  : "/assets/images/GRAND_PE_GLOBAL_LIMITED.png"
              }
              alt="Grand-PE Logo"
              style={
                  location.pathname === '/solar'
                  ? { width: 'auto' }
                  : { height: '50px' }
              }
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* Navigation */}
          <nav className={`main-nav ${isMobileMenuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <NavLink to="/home" end onClick={closeMenu}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" onClick={closeMenu}>
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink to="/solar" onClick={closeMenu}>
                  Solar
                </NavLink>
              </li>

              <li>
                <NavLink to="/tech" onClick={closeMenu}>
                  Tech
                </NavLink>
              </li>

              <li>
                <NavLink to="/translate" onClick={closeMenu}>
                  Translate
                </NavLink>
              </li>

              <li>
                <NavLink to="/plants" onClick={closeMenu}>
                  Plants & Export
                </NavLink>
              </li>
              <li>
                <NavLink to="/signin" onClick={closeMenu}>
                  SignIn
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed header */}
      <div style={{ height: "90px" }} aria-hidden="true" />
    </>
  );
}
