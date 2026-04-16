import React from "react";

function FirstPropertyTrack() {
  return (
    <div>
      <h1>First Property Path</h1>
      <p>Your 5-year journey to becoming a homeowner.</p>

      <div className="card" style={{ marginTop: "24px" }}>
        <h2>Your Milestones</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "12px 0", borderBottom: "1px solid #E2E8F0" }}>
            ✅ Year 1: Build deposit fund
          </li>
          <li style={{ padding: "12px 0", borderBottom: "1px solid #E2E8F0" }}>
            🔄 Year 2: Clear negative debt
          </li>
          <li style={{ padding: "12px 0", borderBottom: "1px solid #E2E8F0" }}>
            ⏳ Year 3: Bond pre-approval
          </li>
          <li style={{ padding: "12px 0", borderBottom: "1px solid #E2E8F0" }}>
            ⏳ Year 4: View 15+ properties
          </li>
          <li style={{ padding: "12px 0" }}>⏳ Year 5: Offer accepted</li>
        </ul>
      </div>
    </div>
  );
}

export default FirstPropertyTrack;
