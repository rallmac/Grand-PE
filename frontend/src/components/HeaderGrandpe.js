import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export function HeaderGrandpe() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  return (
    <>
      {/* MAIN HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

        {/* TOP NAV */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={
                location.pathname === "/solar"
                  ? "/assets/images/GRAND_PE_SOLAR_LOGO.png"
                  : "/assets/images/GRAND_PE_GLOBAL_LIMITED.png"
              }
              alt="Logo"
              className={`object-contain ${
                location.pathname === "/solar" ? "h-10" : "h-8"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <NavLink to="/home" className="hover:text-indigo-600">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-indigo-600">
              About
            </NavLink>
            <NavLink to="/solar" className="hover:text-indigo-600">
              Solar
            </NavLink>
            <NavLink to="/tech" className="hover:text-indigo-600">
              Tech
            </NavLink>
            <NavLink to="/plants" className="hover:text-indigo-600">
              Plants
            </NavLink>

            <NavLink
              to="/signin"
              className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Sign in
            </NavLink>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl text-gray-700"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* 🔽 MOBILE NAV */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700 text-sm">
            <NavLink to="/home" onClick={closeMenu} className="block">
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className="block">
              About
            </NavLink>
            <NavLink to="/solar" onClick={closeMenu} className="block">
              Solar
            </NavLink>
            <NavLink to="/tech" onClick={closeMenu} className="block">
              Tech
            </NavLink>
            <NavLink to="/plants" onClick={closeMenu} className="block">
              Plants & Export
            </NavLink>

            <NavLink
              to="/signin"
              onClick={closeMenu}
              className="block mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-center"
            >
              Sign in
            </NavLink>
          </div>
        )}

        {/* 🔍 SEARCH BAR (ALWAYS VISIBLE, SEPARATE ROW) */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-3">

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, tech, solar, plants..."
                className="w-full rounded-full bg-gray-100 px-5 py-2.5 text-sm text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-500"
              />

              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                🔍
              </button>
            </form>

          </div>
        </div>

      </header>

      {/* SPACER (header + search height) */}
      <div className="h-[110px]" />
    </>
  );
}