import React from "react";
import { Link } from "react-router-dom";

function SimulationLab() {
  return (
    <div>
      <h1>Simulation Lab</h1>
      <p>What would happen if...? Test different scenarios.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <div className="card">
          <h2>🏠 Property vs Renting</h2>
          <p>
            Compare buying a property vs renting and investing the difference.
          </p>
          <Link
            to="/simulation-lab/property-vs-renting"
            className="btn-primary"
            style={{ marginTop: "16px", display: "inline-block" }}
          >
            Try Now 
          </Link>
        </div>

        <div className="card">
          <h2>🚗 Car vs Invest</h2>
          <p>See the 5-year cost of a luxury car vs investing.</p>
          <button className="btn-secondary" style={{ marginTop: "16px" }}>
            Coming Soon
          </button>
        </div>

        <div className="card">
          <h2>🌍 Local vs Offshore</h2>
          <p>Compare different investment allocation strategies.</p>
          <button className="btn-secondary" style={{ marginTop: "16px" }}>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulationLab;
