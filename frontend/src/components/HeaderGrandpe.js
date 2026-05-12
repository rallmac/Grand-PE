import React, { useState, useEffect } from "react";

import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function HeaderGrandpe() {

  const location = useLocation();

  const navigate = useNavigate();

  // MOBILE MENU
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  // PROFILE DROPDOWN
  const [
    isProfileMenuOpen,
    setIsProfileMenuOpen,
  ] = useState(false);

  // SEARCH
  const [search, setSearch] =
    useState("");

  // USER STATE
  const [user, setUser] =
    useState(null);

  // LOAD USER
  useEffect(() => {

    const loadUser = () => {

      try {

        const storedUser =
          localStorage.getItem("user");

        if (storedUser) {

          const parsedUser =
            JSON.parse(storedUser);

          setUser(parsedUser);

        } else {

          setUser(null);

        }

      } catch (error) {

        console.error(
          "Failed to parse user:",
          error
        );

        setUser(null);

      }

    };

    loadUser();

    // LISTEN FOR STORAGE CHANGES
    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        loadUser
      );

    };

  }, []);

  // MOBILE MENU TOGGLE
  const toggleMobileMenu = () => {

    setIsMobileMenuOpen(
      !isMobileMenuOpen
    );

  };

  const closeMenu = () => {

    setIsMobileMenuOpen(false);

  };

  // LOGOUT
  const handleLogout = () => {

    // REMOVES USER
    localStorage.removeItem("user");

    // REMOVES TOKENS
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("refresh_token");

    // CLEARS STATE
    setUser(null);

    setIsProfileMenuOpen(false);

    // REDIRECTS
    navigate("/signin");

    // FORCE CLEAN REFRESH
    window.location.reload();

  };

  // SEARCH
  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    console.log(
      "Search:",
      search
    );

  };

  return (
    <>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

        {/* TOP NAV */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            {/* LOGO WHEN LOGGED OUT */}
            {!user && (

              <Link
                to="/"
                className="flex items-center"
              >

                <img
                  src={
                    location.pathname ===
                    "/solar"
                      ? "/assets/images/GRAND_PE_SOLAR_LOGO.png"
                      : "/assets/images/GRAND_PE_GLOBAL_LIMITED.png"
                  }
                  alt="Logo"
                  className={`object-contain transition-all duration-300 ${
                    location.pathname ===
                    "/solar"
                      ? "h-10"
                      : "h-8"
                  }`}
                />

              </Link>

            )}

            {/* USER INFO */}
            {user && (

              <div className="relative">

                {/* USER BUTTON */}
                <button
                  onClick={() =>
                    setIsProfileMenuOpen(
                      !isProfileMenuOpen
                    )
                  }
                  className="flex items-center gap-3"
                >

                  {/* PROFILE IMAGE */}
                  <img
                    src={
                      user.profilePhoto
                        ? user.profilePhoto
                        : "/assets/images/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover border border-gray-300 shadow-sm"
                  />

                  {/* GREETING */}
                  <div className="flex flex-col leading-tight text-left max-w-[120px]">

                    <span className="text-[11px] text-gray-500">
                      Welcome back
                    </span>

                    <span className="text-sm font-semibold text-gray-800 capitalize">

                      {
                        user.userName ||
                        user.firstName ||
                        "User"
                      }

                    </span>

                  </div>

                </button>

                {/* PROFILE DROPDOWN */}
                {isProfileMenuOpen && (

                  <div className="absolute left-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() =>
                        setIsProfileMenuOpen(
                          false
                        )
                      }
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="block px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() =>
                        setIsProfileMenuOpen(
                          false
                        )
                      }
                    >
                      Account Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            )}

          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">

            <NavLink
              to="/home"
              className="hover:text-[#265073] transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className="hover:text-[#265073] transition"
            >
              About
            </NavLink>

            <NavLink
              to="/solar"
              className="hover:text-[#265073] transition"
            >
              Solar
            </NavLink>

            <NavLink
              to="/tech"
              className="hover:text-[#265073] transition"
            >
              Tech
            </NavLink>

            <NavLink
              to="/plants"
              className="hover:text-[#265073] transition"
            >
              Plants
            </NavLink>

            {/* SIGN IN BUTTON */}
            {!user && (

              <NavLink
                to="/signin"
                className="ml-2 px-4 py-2 rounded-md bg-[#265073] text-white hover:bg-[#1f3e59] transition shadow-sm"
              >
                Sign in
              </NavLink>

            )}

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl text-gray-700"
          >

            {
              isMobileMenuOpen
                ? "✕"
                : "☰"
            }

          </button>

        </div>

        {/* MOBILE NAV */}
        {isMobileMenuOpen && (

          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700 text-sm font-semibold shadow-sm">

            <NavLink
              to="/home"
              onClick={closeMenu}
              className="block hover:text-[#265073]"
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className="block hover:text-[#265073]"
            >
              About
            </NavLink>

            <NavLink
              to="/solar"
              onClick={closeMenu}
              className="block hover:text-[#265073]"
            >
              Solar
            </NavLink>

            <NavLink
              to="/tech"
              onClick={closeMenu}
              className="block hover:text-[#265073]"
            >
              Tech
            </NavLink>

            <NavLink
              to="/plants"
              onClick={closeMenu}
              className="block hover:text-[#265073]"
            >
              Plants & Export
            </NavLink>

            {/* SETTINGS */}
            {user && (

              <Link
                to="/settings"
                onClick={closeMenu}
                className="block hover:text-[#265073]"
              >
                Settings
              </Link>

            )}

            {/* SIGN IN */}
            {!user && (

              <NavLink
                to="/signin"
                onClick={closeMenu}
                className="block mt-2 px-4 py-2 rounded-md bg-[#265073] text-white text-center hover:bg-[#1f3e59] transition"
              >
                Sign in
              </NavLink>

            )}

            {/* LOGOUT */}
            {user && (

              <button
                onClick={handleLogout}
                className="block w-full mt-2 px-4 py-2 rounded-md bg-red-500 text-white text-center hover:bg-red-600 transition"
              >
                Logout
              </button>

            )}

          </div>

        )}

        {/* SEARCH BAR */}
        <div className="border-t border-gray-200 bg-white">

          <div className="max-w-3xl mx-auto px-6 py-3">

            <form
              onSubmit={handleSearch}
              className="relative"
            >

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search products, tech, solar, plants..."
                className="w-full rounded-full bg-gray-100 px-5 py-2.5 pr-12 text-sm text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#265073] transition"
              />

              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#265073] transition"
              >
                🔍
              </button>

            </form>

          </div>

        </div>

      </header>

      {/* HEADER SPACER */}
      <div className="h-[110px]" />

    </>
  );
}
