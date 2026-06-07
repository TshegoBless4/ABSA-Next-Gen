// src/pages/PropertyStudio.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaHome, FaChartLine, FaInfoCircle, FaCalculator, FaMoneyBillWave } from "react-icons/fa";

function PropertyStudio() {
  const [rent, setRent] = useState(12000);
  const [propertyValue, setPropertyValue] = useState(1800000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [investmentReturn, setInvestmentReturn] = useState(10);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);
  };

  const deposit = propertyValue * (depositPercent / 100);
  const monthlyBond = propertyValue * 0.009;
  const monthlyDiff = monthlyBond - rent;
  const fiveYearBuyCost = monthlyBond * 12 * 5 + deposit;
  const fiveYearRentCost = rent * 12 * 5;
  const fiveYearInvestValue = monthlyDiff > 0 ? monthlyDiff * 12 * 5 * (1 + investmentReturn / 100) : 0;
  const transferDuty = propertyValue > 1100000 ? Math.min(propertyValue * 0.05, 46000) : 0;
  const bondFees = 30000;
  const maintenanceCost = propertyValue * 0.01 * 5;

  const chartData = [];
  for (let year = 1; year <= 5; year++) {
    chartData.push({
      year: `Year ${year}`,
      buying: monthlyBond * 12 * year + deposit + transferDuty + bondFees,
      renting: rent * 12 * year + (monthlyDiff > 0 ? monthlyDiff * 12 * year * (1 + investmentReturn / 100) : 0)
    });
  }

  const getVerdict = () => {
    if (monthlyDiff > 0) {
      return {
        verdict: "Renting and investing the difference may leave you better off financially after 5 years.",
        recommendation: "Consider investing the monthly difference in a diversified portfolio."
      };
    } else {
      return {
        verdict: "Buying may be the better option if you plan to stay in the property long-term (7+ years).",
        recommendation: "Factor in transfer duty, bond fees, and maintenance costs when calculating your true costs."
      };
    }
  };

  const verdict = getVerdict();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaHome size={28} color="#F4A261" />
          <h1 style={{ marginBottom: '0' }}>Property vs Renting Studio</h1>
        </div>
        <p style={{ color: '#acacac' }}>Compare buying a property vs renting and investing the difference in Johannesburg.</p>
      </div>

      {/* Educational Note */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#F4A261" />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>What this studio does</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac' }}>
          This calculator compares two paths over 5 years: buying a property (paying bond, levies, maintenance, and transfer duty) 
          versus renting and investing the monthly difference. Toggle the sliders below to see how your numbers change.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Input Panel */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalculator size={18} /> Adjust Your Numbers</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label>Monthly Rent (ZAR)</label>
            <input type="range" min="4000" max="25000" step="500" value={rent} onChange={(e) => setRent(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{formatCurrency(rent)} / month</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Property Value (ZAR)</label>
            <input type="range" min="500000" max="3500000" step="50000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{formatCurrency(propertyValue)}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Deposit Percentage (%)</label>
            <input type="range" min="0" max="20" step="1" value={depositPercent} onChange={(e) => setDepositPercent(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{depositPercent}% ({formatCurrency(deposit)})</p>
          </div>

          <div>
            <label>Investment Return (% per year)</label>
            <input type="range" min="4" max="15" step="0.5" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{investmentReturn}% per year</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)} className="btn-secondary" style={{ marginTop: '16px', width: '100%', padding: '8px' }}>
            {showDetails ? 'Hide SA Context Details ▲' : 'Show SA Context Details ▼'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '8px' }}>South African Context</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Transfer duty: ~{formatCurrency(transferDuty)}</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Bond registration fees: ~{formatCurrency(bondFees)}</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Maintenance (5 years): ~{formatCurrency(maintenanceCost)}</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Monthly levies: R2,000–R4,000</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Prime rate: 11.75%</p>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaChartLine size={18} /> 5-Year Comparison</h2>
          
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', color: '#F4A261', marginBottom: '8px' }}>Buying</h3>
            <p style={{ fontSize: '13px' }}>Monthly Bond: {formatCurrency(monthlyBond)}</p>
            <p style={{ fontSize: '13px' }}>Deposit: {formatCurrency(deposit)}</p>
            <p style={{ fontSize: '13px' }}>Transfer Duty + Fees: {formatCurrency(transferDuty + bondFees)}</p>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#F4A261', marginTop: '8px' }}>Total 5-Year Cost: {formatCurrency(fiveYearBuyCost + transferDuty + bondFees + maintenanceCost)}</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', color: '#00A86B', marginBottom: '8px' }}>Renting + Investing</h3>
            <p style={{ fontSize: '13px' }}>Monthly Rent: {formatCurrency(rent)}</p>
            {monthlyDiff > 0 && <p style={{ fontSize: '13px', color: '#00A86B' }}>Monthly Invested: {formatCurrency(monthlyDiff)}</p>}
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#00A86B', marginTop: '8px' }}>Total 5-Year Cost: {formatCurrency(fiveYearRentCost)}</p>
            {monthlyDiff > 0 && <p style={{ fontSize: '13px' }}>Investment Value: {formatCurrency(fiveYearInvestValue)}</p>}
          </div>

          {/* Chart */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>5-Year Cost Comparison Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `R${value/1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="buying" stroke="#b60232" strokeWidth={3} name="Buying" />
                <Line type="monotone" dataKey="renting" stroke="#F4A261" strokeWidth={3} name="Renting + Investing" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Studio Verdict */}
      <div className="card" style={{ marginTop: '24px', backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaMoneyBillWave size={20} color="#F4A261" />
          <h2 style={{ marginBottom: '0', fontSize: '18px' }}>Studio Verdict</h2>
        </div>
        <p style={{ marginBottom: '8px', color: 'white' }}>{verdict.verdict}</p>
        <p style={{ fontSize: '13px', color: '#acacac' }}>{verdict.recommendation}</p>
        <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>
          SA context: Transfer duty (~R46k for R1.8M), bond fees (~R30k), maintenance (~1% of value/year).
        </p>
      </div>
    </div>
  );
}

export default PropertyStudio;