import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import logo from '../assets/images/logo.svg';
import {
  IoCloseOutline,
  IoSearchOutline,
  IoCartOutline,
  IoMenuOutline,
  IoArrowForwardOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoBookOutline,
} from 'react-icons/io5';

function Header({ isScrolled }) {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const toggleNavbar = () => setIsNavbarActive(!isNavbarActive);
  const closeNavbar = () => setIsNavbarActive(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Instant search navigation
    if (e.target.value.trim() && window.location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <header className={`header w-full bg-white py-[12px] shadow-[0_6px_15px_0_rgba(0,0,0,0.05)] z-[100] transition-all ${isScrolled ? 'header-sticky' : 'absolute top-0 left-0'}`}>
      <div className="container flex justify-between items-center gap-[15px] relative">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} width="162" height="50" alt="EduWeb logo" className="block" />
        </Link>

        {/* Navigation Bar */}
        <nav className={`navbar fixed top-0 -left-[320px] bg-white w-full max-w-[320px] h-full z-[120] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 xl:static xl:w-auto xl:max-w-none xl:h-auto xl:z-auto xl:transition-none xl:shadow-none xl:translate-x-0 ${isNavbarActive ? 'translate-x-[320px]' : ''}`}>
          <div className="wrapper flex justify-between items-center gap-[15px] p-[15px_20px] border-b border-platinum xl:hidden">
            <Link to="/" className="logo" onClick={closeNavbar}>
              <img src={logo} width="162" height="50" alt="EduWeb logo" />
            </Link>

            <button className="nav-close-btn bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-2 rounded-full text-[24px] hover:bg-kappel hover:text-white transition-all" aria-label="close menu" onClick={closeNavbar}>
              <IoCloseOutline aria-hidden="true" />
            </button>
          </div>

          <ul className="navbar-list p-[15px_20px] xl:flex xl:gap-[50px] xl:p-0">
            <li className="navbar-item border-b border-platinum xl:border-b-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar-link block py-[8px] font-medium transition-all xl:py-[20px] ${
                    isActive ? 'text-kappel font-semibold' : 'text-eerie-black-1 hover:text-kappel'
                  }`
                }
                onClick={closeNavbar}
              >
                Home
              </NavLink>
            </li>
            <li className="navbar-item border-b border-platinum xl:border-b-0">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar-link block py-[8px] font-medium transition-all xl:py-[20px] ${
                    isActive ? 'text-kappel font-semibold' : 'text-eerie-black-1 hover:text-kappel'
                  }`
                }
                onClick={closeNavbar}
              >
                About
              </NavLink>
            </li>
            <li className="navbar-item border-b border-platinum xl:border-b-0">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `navbar-link block py-[8px] font-medium transition-all xl:py-[20px] ${
                    isActive ? 'text-kappel font-semibold' : 'text-eerie-black-1 hover:text-kappel'
                  }`
                }
                onClick={closeNavbar}
              >
                Courses
              </NavLink>
            </li>
            <li className="navbar-item border-b border-platinum xl:border-b-0">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `navbar-link block py-[8px] font-medium transition-all xl:py-[20px] ${
                    isActive ? 'text-kappel font-semibold' : 'text-eerie-black-1 hover:text-kappel'
                  }`
                }
                onClick={closeNavbar}
              >
                Blog
              </NavLink>
            </li>
            <li className="navbar-item border-b border-platinum xl:border-b-0 xl:hidden">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `navbar-link block py-[8px] font-medium transition-all xl:py-[20px] ${
                    isActive ? 'text-kappel font-semibold' : 'text-eerie-black-1 hover:text-kappel'
                  }`
                }
                onClick={closeNavbar}
              >
                Contact
              </NavLink>
            </li>
            {/* Authenticated routes in mobile drawer */}
            {user ? (
              <>
                <li className="navbar-item border-b border-platinum xl:hidden">
                  <NavLink to="/profile" className="navbar-link block py-[8px] font-medium text-eerie-black-1 hover:text-kappel" onClick={closeNavbar}>
                    Profile ({user.name})
                  </NavLink>
                </li>
                <li className="navbar-item border-b border-platinum xl:hidden">
                  <NavLink to="/my-courses" className="navbar-link block py-[8px] font-medium text-eerie-black-1 hover:text-kappel" onClick={closeNavbar}>
                    My Courses
                  </NavLink>
                </li>
                <li className="navbar-item xl:hidden">
                  <button onClick={() => { logout(); closeNavbar(); }} className="navbar-link flex items-center gap-2 w-full text-left py-[8px] font-medium text-red-500 hover:text-red-700">
                    <IoLogOutOutline className="text-xl" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item border-b border-platinum xl:hidden">
                  <NavLink to="/login" className="navbar-link block py-[8px] font-medium text-eerie-black-1 hover:text-kappel" onClick={closeNavbar}>
                    Login
                  </NavLink>
                </li>
                <li className="navbar-item xl:hidden">
                  <NavLink to="/register" className="navbar-link block py-[8px] font-medium text-eerie-black-1 hover:text-kappel" onClick={closeNavbar}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions flex items-center gap-[15px] md:gap-[25px]">
          {/* Instant Search Bar */}
          <div className="relative flex items-center">
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="absolute right-[40px] top-1/2 -translate-y-1/2 bg-white border border-platinum rounded-[5px] p-1 flex items-center w-[200px] md:w-[250px] shadow-sm animate-fade-in z-50">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="px-2 py-1 text-[1.4rem] font-sans text-eerie-black-1 focus:outline-none w-full"
                  autoFocus
                />
                <button type="submit" className="text-kappel p-1">
                  <IoSearchOutline className="text-xl" />
                </button>
              </form>
            )}
            <button
              className="header-action-btn text-[24px] text-eerie-black-1 hover:text-kappel transition-all p-1"
              aria-label="toggle search"
              onClick={handleSearchToggle}
              title="Search"
            >
              <IoSearchOutline aria-hidden="true" />
            </button>
          </div>

          <button className="header-action-btn relative text-[24px] text-eerie-black-1 hover:text-kappel transition-all p-1" aria-label="cart" title="Cart">
            <IoCartOutline aria-hidden="true" />
            <span className="btn-badge absolute -top-[5px] -right-[5px] bg-kappel text-white font-spartan text-[1.2rem] min-w-[18px] h-[18px] rounded-full flex items-center justify-center">0</span>
          </button>

          {/* Desktop Authentication Flow */}
          {user ? (
            <div className="hidden xl:flex items-center gap-[15px]">
              <Link to="/my-courses" className="header-action-btn text-[24px] text-eerie-black-1 hover:text-kappel transition-all p-1" title="My Courses">
                <IoBookOutline aria-hidden="true" />
              </Link>
              <Link to="/profile" className="header-action-btn text-[24px] text-eerie-black-1 hover:text-kappel transition-all p-1" title="Profile Dashboard">
                <IoPersonCircleOutline aria-hidden="true" />
              </Link>
              <button
                onClick={logout}
                className="btn has-before bg-red-500 flex items-center gap-2 text-[1.5rem] font-spartan px-4 py-2 rounded-[5px]"
                title="Log Out"
              >
                <span className="span">Log out</span>
                <IoLogOutOutline className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="hidden xl:flex items-center gap-[15px]">
              <Link to="/login" className="text-eerie-black-1 hover:text-kappel text-[1.6rem] font-medium transition-all">
                Login
              </Link>
              <Link to="/register" className="btn has-before flex items-center">
                <span className="span">Try for free</span>
                <IoArrowForwardOutline aria-hidden="true" />
              </Link>
            </div>
          )}

          <button className="header-action-btn text-[24px] text-eerie-black-1 hover:text-kappel transition-all xl:hidden p-1" aria-label="open menu" onClick={toggleNavbar}>
            <IoMenuOutline aria-hidden="true" />
          </button>
        </div>

        {/* Overlay */}
        <div className={`overlay fixed inset-0 bg-black-80 z-40 transition-opacity duration-300 xl:hidden ${isNavbarActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeNavbar}></div>
      </div>
    </header>
  );
}

export default Header;
