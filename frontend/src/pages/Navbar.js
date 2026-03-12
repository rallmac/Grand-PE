import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Menu, Search, ShoppingCart, Store } from "lucide-react";
import "./solar-page.css";

export default function Navbar() {
  const categories = [
    "Promotions",
    "Refrigerator",
    "Freezer",
    "Washing Machines",
    "TVs",
    "Audio",
    "ACs",
    "Cookers/Microwave",
    "Small Appliances/Fans",
    "Power Solutions",
  ];

  const categoryRailRef = useRef(null);

  const scrollCategories = (direction) => {
    if (!categoryRailRef.current) return;
    const offset = direction === "left" ? -220 : 220;
    categoryRailRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <header className="solar-header">
      <div className="solar-container solar-topbar">
        <a href="/" className="solar-brand" aria-label="Colors by Fouani home">
          <img className="solar-logo" src="/assets/images/GRAND_PE_GLOBAL_LIMITED.png" alt="Colors by Fouani" />
        </a>

        <div className="solar-search-wrap">
          <Search className="solar-search-icon" size={24} aria-hidden="true" />
          <input className="solar-search" placeholder="Search for products" />
        </div>

        <div className="solar-actions">
          <a href="/categories">
            <MapPin size={16} aria-hidden="true" />
            <span>Showrooms</span>
          </a>
          <a href="/categories">
            <Store size={16} aria-hidden="true" />
            <span>Nigeria</span>
          </a>
          <a href="/cart" className="solar-cart-link">
            <span className="solar-cart-icon-wrap">
              <ShoppingCart size={18} aria-hidden="true" />
              <span className="solar-cart-count">0</span>
            </span>
            <span>My Cart</span>
          </a>
          <a href="/login">Login / Register</a>
        </div>
      </div>

      <div className="solar-strip">
        <div className="solar-container solar-strip-row">
          <button className="solar-all-categories" type="button">
            <Menu size={24} aria-hidden="true" />
            <span>All Categories</span>
          </button>

          <button
            type="button"
            className="solar-strip-arrow"
            onClick={() => scrollCategories("left")}
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="solar-strip-links" ref={categoryRailRef}>
            {categories.map((category) => (
              <a key={category} href="/categories">
                {category}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="solar-strip-arrow"
            onClick={() => scrollCategories("right")}
            aria-label="Scroll categories right"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}