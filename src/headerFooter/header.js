import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import "./header.css";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus(); // Check when Header mounts

    // Listen for custom 'storageChange' event
    window.addEventListener("storageChange", checkLoginStatus);

    // return () => {
    //   window.removeEventListener("storageChange", checkLoginStatus);
    // };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");

    // Fire event so other components can know
    window.dispatchEvent(new Event("storageChange"));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/interior" className="logo-link">
          <img src={logo} alt="Interno Logo" className="logo" />
          <span className="brand-name">Interno</span>
        </Link>
      </div>

      <nav className="header-right">
        <ul className="nav-links">
          <li><Link to="/interior">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/services">Our Services</Link></li>
          <li><Link to="/projects">Portfolio</Link></li>
          <li><Link to="/blog">Insights</Link></li>
          <li><Link to="/contact">Get in Touch</Link></li>

          {token ? (
            <li className="profile-dropdown">
              <span onClick={toggleDropdown} className="profile-name">My Account ▾</span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/profile">Dashboard</Link></li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login" className="login-btn">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
