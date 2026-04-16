import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/money-snapshot", label: "Money Snapshot" },
    { path: "/tracks", label: "Strategy Tracks" },
    { path: "/simulation-lab", label: "Simulation Lab" },
    { path: "/library", label: "Library" },
  ];

  const isActive = (path) => location.pathname === path;

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
    //    position: 'absolute',
    // left: 7,
  };

  const navStyle = {
    display: "flex",
    gap: "24px",
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
