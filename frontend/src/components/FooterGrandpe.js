import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function FooterGrandpe() {
  const [formData, setFormData] = useState({ email: "" });
  const [formStatus, setFormStatus] = useState("");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setFormStatus("Please enter a valid email address.");
      return;
    }

    setFormStatus("Thank you for subscribing!");
    setFormData({ email: "" });

    setTimeout(() => setFormStatus(""), 3000);
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">

          {/* ABOUT */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">
              Grand-PE Global Limited
            </h4>

            <p className="text-sm leading-6 text-gray-400">
              Empowering progress through diverse expertise and sustainable
              solutions for a brighter future.
            </p>

            <div className="flex items-start gap-2 text-sm text-gray-400">
              <a href="https://maps.app.goo.gl/bNZU5AaESDYNyLA18">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  Suit A14, 36 Old Aba Road, Port Harcourt, Nigeria.
                </span>
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-500 text-indogo-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 text-indogo-500">About Us</Link></li>
              <li><Link to="/solar" className="hover:text-orange-500 text-indogo-500">Grand-PE Solar</Link></li>
              <li><Link to="/tech" className="hover:text-orange-500 text-indogo-500">Grand-PE Tech</Link></li>
              <li><Link to="/translate" className="hover:text-orange-500 text-indogo-500">Grand-PE Translate</Link></li>
              <li><Link to="/plants" className="hover:text-orange-500 text-indogo-500">Grand-PE Plants & Export</Link></li>
              <li><Link to="/home" className="hover:text-orange-500 text-indogo-500">Blog</Link></li>
              <li><Link to="/home" className="hover:text-orange-500 text-indogo-500">Privacy Policy</Link></li>
              <li><Link to="/home" className="hover:text-orange-500 text-indogo-500">Terms of Service</Link></li>
              <li><Link to="/admin-signin" className="hover:text-orange-500 text-indogo-500">Admin</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER (FIXED ALIGNMENT ONLY) */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-semibold text-lg">Stay Updated</h4>

            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest news and offers.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row lg:flex-col gap-2 items-start"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full sm:w-auto lg:w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <button
                type="submit"
                className="bg-[#265073] hover:bg-[#1f3e59] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Subscribe
              </button>
            </form>

            {formStatus && (
              <p
                className={`text-sm ${
                  formStatus.includes("Thank you")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formStatus}
              </p>
            )}
          </div>

          {/* SOCIAL */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">
              Connect With Us
            </h4>

            <div className="flex gap-4">
              <a href="https://facebook.com/share/1Yr3kRXZ97/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-800 hover:bg-[#265073] transition">
                <Facebook className="w-5 h-5" />
              </a>

              <a href="https://instagram.com/grandpe_solar?utm_source=qr&igsh=ZDJ4eGh4cDU5ZWhr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-800 hover:bg-[#265073] transition">
                <Instagram className="w-5 h-5" />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-800 hover:bg-[#265073] transition">
                <Linkedin className="w-5 h-5" />
              </a>

              <a href="https://wa.me/+2348064013822" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-800 hover:bg-[#25D366] transition">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-gray-400">
              Company Reg: RC.8316278
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p>© {year} Grand-PE Global Limited. All Rights Reserved.</p>
          <p><Link to="/super-admin-signin" className="hover:text-gray-300 text-gray-300">Website by Grand-PE Tech</Link></p>
        </div>

      </div>
    </footer>
  );
}
