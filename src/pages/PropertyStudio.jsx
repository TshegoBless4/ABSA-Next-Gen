import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function PropertyStudio() {
  const [rent, setRent] = useState(12000);
  const [propertyValue, setPropertyValue] = useState(1800000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [investmentReturn, setInvestmentReturn] = useState(10);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const deposit = propertyValue * (depositPercent / 100);
  const monthlyBond = propertyValue * 0.009; // Simplified bond calculation

  return (
    <div>
      <h1>Property vs Renting in Johannesburg</h1>
      <p>Compare buying a property vs renting and investing the difference.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          marginTop: "32px",
        }}
      >
        {/* Input Panel */}
        <div className="card">
          <h2>Adjust Your Numbers</h2>

          <div style={{ marginBottom: "20px" }}>
            <label>Monthly Rent (ZAR)</label>
            <input
              type="range"
              min="4000"
              max="25000"
              step="500"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ marginTop: "8px" }}>{formatCurrency(rent)} / month</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Property Value (ZAR)</label>
            <input
              type="range"
              min="500000"
              max="3500000"
              step="50000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ marginTop: "8px" }}>{formatCurrency(propertyValue)}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Deposit Percentage (%)</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={depositPercent}
              onChange={(e) => setDepositPercent(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ marginTop: "8px" }}>
              {depositPercent}% ({formatCurrency(deposit)})
            </p>
          </div>

          <div>
            <label>Investment Return (% per year)</label>
            <input
              type="range"
              min="4"
              max="15"
              step="0.5"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ marginTop: "8px" }}>{investmentReturn}% per year</p>
          </div>
        </div>

        

        {/* Results Panel */}
        <div className="card">
          <h2>5-Year Comparison</h2>

          <div style={{ marginBottom: "24px" }}>
            <h3>🏠 Buying</h3>
            <p>Monthly Bond: {formatCurrency(monthlyBond)}</p>
            <p>Deposit: {formatCurrency(deposit)}</p>
            <p
              style={{ color: "#cb7307", fontWeight: "bold", marginTop: "8px" }}
            >
              5-Year Cost: {formatCurrency(monthlyBond * 12 * 5 + deposit)}
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3>💰 Renting + Investing</h3>
            <p>Monthly Rent: {formatCurrency(rent)}</p>
            <p>Monthly Invested: {formatCurrency(monthlyBond - rent)}</p>
            <p
              style={{ color: "#00A86B", fontWeight: "bold", marginTop: "8px" }}
            >
              5-Year Investment:{" "}
              {formatCurrency(
                (monthlyBond - rent) * 12 * 5 * (1 + investmentReturn / 100),
              )}
            </p>
          </div>
{/* 5-Year Comparison Chart */}
<div className="card" style={{ marginTop: '24px' }}>
  <h2>5-Year Comparison Chart</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={(() => {
      const data = [];
      const monthlyDiff = monthlyBond - rent;
      for (let year = 1; year <= 5; year++) {
        data.push({
          year: `Year ${year}`,
          buying: monthlyBond * 12 * year,
          renting: rent * 12 * year + (monthlyDiff > 0 ? monthlyDiff * 12 * year * (1 + investmentReturn / 100) : 0)
        });
      }
      return data;
    })()}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis tickFormatter={(value) => `R${value/1000}k`} />
      <Tooltip formatter={(value) => `R${value.toLocaleString()}`} />
      <Line type="monotone" dataKey="buying" stroke="#b60232" strokeWidth={3} name="Buying" />
      <Line type="monotone" dataKey="renting" stroke="#F4A261" strokeWidth={3} name="Renting + Investing" />
    </LineChart>
  </ResponsiveContainer>
</div>
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #16110d 0%, #2d2729 78%)",
              borderRadius: "8px",
            }}
          >
            <h3> Studio Verdict</h3>
            {monthlyBond - rent > 0 ? (
              <p>
                Renting and investing the difference could leave you better off
                after 5 years.
              </p>
            ) : (
              <p>
                Buying may be the better option if you plan to stay long-term.
              </p>
            )}
            <p style={{ fontSize: "14px", marginTop: "8px", color: "#acacac" }}>
              ⓘ South African context: Transfer duty (~R46,000), bond fees
              (~R30,000), and maintenance costs apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyStudio;
