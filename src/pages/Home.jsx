import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 0 ",
          background: "linear-gradient(135deg, #ff780f 0%, #b60232 85%)",
          color: "white",
          borderRadius: "24px",
          marginBottom: "48px",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
          Your First Five Years Start Here
        </h1>
        <p
          style={{
            fontSize: "20px",
            marginBottom: "13px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          ABSA NextGen Wealth Studio helps high-earning young professionals make
          confident financial decisions for the next five years.
        </p>
        <Link to="/money-snapshot" className="btn-primary">
          Get Started →
        </Link>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
          <h3>Money Snapshot</h3>
          <p>
            See where you stand - income, expenses, and progress toward your
            goals.
          </p>
          <Link
            to="/money-snapshot"
            className="btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            View Dashboard
          </Link>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
          <h3>Strategy Tracks</h3>
          <p>Choose a 5-year path tailored to your goals and personality.</p>
          <Link
            to="/tracks"
            className="btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            Explore Tracks
          </Link>
        </div>

        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧪</div>
          <h3>Simulation Lab</h3>
          <p>Test "what-if" scenarios and see outcomes over 3-5 years.</p>
          <Link
            to="/simulation-lab"
            className="btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            Try Simulations
          </Link>
        </div>
      </div>

      {/* SA Context Section */}
      <div
        className="card"
        style={{ textAlign: "center", background: "linear-gradient(135deg, #16110d 0%, #2d2729 85%)" }}
      >
        <h3>🇿🇦 Made for South Africans</h3>
        <p>SA tax brackets, property prices, retirement annuities, and more.</p>
      </div>
    </div>
  );
}

export default Home;
