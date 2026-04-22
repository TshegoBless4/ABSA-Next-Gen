// src/components/layout/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/money-snapshot", label: "Money Snapshot" },
    { path: "/tracks", label: "Strategy Tracks" },
    { path: "/simulation-lab", label: "Simulation Lab" },
    { path: "/library", label: "Library" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#b60232",
    padding: "16px 24px",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const logoStyle = {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const navStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 0",
  };

  const activeStyle = {
    ...linkStyle,
    borderBottom: "3px solid #F4A261",
  };

  const logoutButtonStyle = {
    backgroundColor: 'white',
    color: '#b60232',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '16px',
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          ABSA NextGen Wealth
        </Link>
        <div style={navStyle}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={isActive(link.path) ? activeStyle : linkStyle}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;