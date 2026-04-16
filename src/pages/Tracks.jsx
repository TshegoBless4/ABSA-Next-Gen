import React from "react";
import { Link } from "react-router-dom";

function Tracks() {
  return (
    <div>
      <h1>Strategy Tracks</h1>
      <p>Choose your 5-year financial path.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <div className="card">
          <h2>🏠 First Property Path</h2>
          <p>
            For future homeowners - build your deposit and buy your first home.
          </p>
          <Link
            to="/tracks/first-property"
            className="btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            View Track 
          </Link>
        </div>

        <div className="card">
          <h2>⚖️ Balanced Lifestyle</h2>
          <p>For flexibility seekers - enjoy today while building wealth.</p>
          <button className="btn-secondary" style={{ marginTop: "16px" }}>
            Coming Soon
          </button>
        </div>

        <div className="card">
          <h2>🌍 Aggressive Global</h2>
          <p>For high risk tolerance - maximize offshore growth.</p>
          <button className="btn-secondary" style={{ marginTop: "16px" }}>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tracks;
