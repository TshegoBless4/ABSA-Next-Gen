// src/pages/CarStudio.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { FaCar, FaTaxi, FaChartLine, FaInfoCircle, FaMoneyBillWave, FaCalculator } from "react-icons/fa";

function CarStudio() {
  const [carPrice, setCarPrice] = useState(600000);
  const [deposit, setDeposit] = useState(60000);
  const [interestRate, setInterestRate] = useState(12);
  const [balloonPayment, setBalloonPayment] = useState(30);
  const [uberBudget, setUberBudget] = useState(3000);
  const [investmentReturn, setInvestmentReturn] = useState(10);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);

  const loanAmount = carPrice - deposit;
  const monthlyRate = interestRate / 100 / 12;
  const balloonAmount = carPrice * (balloonPayment / 100);
  
  const calculateMonthlyPayment = () => {
    const n = 60;
    const pvBalloon = balloonAmount / Math.pow(1 + monthlyRate, n);
    const adjustedLoan = loanAmount - pvBalloon;
    if (adjustedLoan <= 0) return 0;
    return adjustedLoan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalFuelCost = 2500 * 60;
  const totalInsurance = (carPrice * 0.03) * 5;
  const totalMaintenance = (carPrice * 0.01) * 5;
  const totalCarCost = deposit + (monthlyPayment * 60) + balloonAmount + totalFuelCost + totalInsurance + totalMaintenance;
  const totalUberCost = uberBudget * 12 * 5;
  const monthlyDifference = (monthlyPayment + 2500 + (carPrice * 0.03 / 12) + (carPrice * 0.01 / 12)) - uberBudget;
  const fiveYearSavings = monthlyDifference * 60;
  const investmentValue = fiveYearSavings * (1 + investmentReturn / 100);
  const resaleValue = carPrice * 0.38;

  const depreciationData = [];
  for (let year = 0; year <= 5; year++) {
    let value;
    if (year === 0) value = carPrice;
    else if (year === 1) value = carPrice * 0.75;
    else if (year === 2) value = carPrice * 0.62;
    else if (year === 3) value = carPrice * 0.52;
    else if (year === 4) value = carPrice * 0.44;
    else value = carPrice * 0.38;
    depreciationData.push({ year, value });
  }

  const comparisonData = [];
  for (let year = 1; year <= 5; year++) {
    comparisonData.push({
      year: year,
      carCost: deposit + (monthlyPayment + 2500 + (carPrice * 0.03 / 12) + (carPrice * 0.01 / 12)) * 12 * year,
      uberCost: uberBudget * 12 * year,
    });
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaCar size={28} color="#F4A261" />
          <h1 style={{ marginBottom: '0' }}>Car vs Invest Studio</h1>
        </div>
        <p style={{ color: '#acacac' }}>Compare the true 5-year cost of financing a luxury car vs using Uber and investing the savings.</p>
      </div>

      {/* Educational Note */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#F4A261" />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>What this studio does</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac' }}>
          This calculator compares two paths over 5 years: financing a luxury car versus using Uber/rental cars and investing the difference.
          Toggle the sliders below to see the true cost of ownership including fuel, insurance, maintenance, and depreciation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Inputs */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalculator size={18} /> Adjust Your Numbers</h2>
          
          <div style={{ marginBottom: '14px' }}>
            <label>Car Price (ZAR)</label>
            <input type="range" min="200000" max="1200000" step="50000" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(carPrice)}</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Deposit (ZAR)</label>
            <input type="range" min="0" max={carPrice * 0.3} step="10000" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(deposit)} ({Math.round((deposit / carPrice) * 100)}%)</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Interest Rate (%)</label>
            <input type="range" min="8" max="18" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{interestRate}% (SA prime: 11.75%)</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Balloon Payment (%)</label>
            <input type="range" min="0" max="40" step="5" value={balloonPayment} onChange={(e) => setBalloonPayment(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{balloonPayment}% = {formatCurrency(balloonAmount)} due at end</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Monthly Uber/Taxi Budget (ZAR)</label>
            <input type="range" min="1000" max="8000" step="500" value={uberBudget} onChange={(e) => setUberBudget(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(uberBudget)} / month</p>
          </div>

          <div>
            <label>Investment Return (% per year)</label>
            <input type="range" min="4" max="15" step="0.5" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{investmentReturn}% per year</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)} className="btn-secondary" style={{ marginTop: '16px', width: '100%', padding: '8px' }}>
            {showDetails ? 'Hide SA Context Details ▲' : 'Show SA Context Details ▼'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '8px' }}>🇿🇦 South African Context</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Fuel: ~R25/L (95 unleaded)</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Insurance: 3-5% of car value/year</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Maintenance: 1-2% of car value/year</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Depreciation: 20-30% in first year</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Resale value after 5 years: ~38%</p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaChartLine size={18} /> 5-Year Comparison</h2>
          
          <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px", marginBottom: "16px" }}>
            <h3 style={{ color: "#F4A261", marginBottom: "8px" }}>Luxury Car</h3>
            <p style={{ fontSize: '13px' }}>Monthly Payment: {formatCurrency(monthlyPayment)}</p>
            <p style={{ fontSize: '13px' }}>Final Balloon: {formatCurrency(balloonAmount)}</p>
            <p style={{ fontSize: '13px' }}>Fuel (5 yrs): {formatCurrency(totalFuelCost)}</p>
            <p style={{ fontSize: '13px' }}>Insurance + Maintenance: {formatCurrency(totalInsurance + totalMaintenance)}</p>
            <p style={{ fontSize: '15px', fontWeight: "bold", marginTop: "8px", color: '#F4A261' }}>Total Cost: {formatCurrency(totalCarCost)}</p>
            <p style={{ fontSize: '11px', color: '#acacac', marginTop: '4px' }}>Resale value after 5 years: {formatCurrency(resaleValue)}</p>
          </div>

          <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px", marginBottom: "16px" }}>
            <h3 style={{ color: "#00A86B", marginBottom: "8px" }}>Uber + Invest</h3>
            <p style={{ fontSize: '13px' }}>Monthly: {formatCurrency(uberBudget)}</p>
            <p style={{ fontSize: '15px', fontWeight: "bold", marginTop: "8px", color: '#00A86B' }}>Total Cost: {formatCurrency(totalUberCost)}</p>
            {monthlyDifference > 0 && <p style={{ fontSize: '13px', color: "#00A86B" }}>Monthly Savings to Invest: {formatCurrency(monthlyDifference)}</p>}
          </div>

          <div style={{ padding: "12px", backgroundColor: "#1a1a2e", borderRadius: "8px" }}>
            <h3 style={{ marginBottom: "8px" }}>The Difference</h3>
            <p style={{ fontSize: '13px' }}>You could save: <strong style={{ color: "#00A86B", fontSize: "18px" }}>{formatCurrency(Math.abs(totalCarCost - totalUberCost))}</strong></p>
            {monthlyDifference > 0 && <p style={{ fontSize: '13px' }}>Invested over 5 years at {investmentReturn}%: <strong style={{ color: "#F4A261" }}>{formatCurrency(investmentValue)}</strong></p>}
          </div>

          {/* Chart */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>5-Year Cost Comparison Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `R${v/1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Line type="monotone" dataKey="carCost" stroke="#F4A261" strokeWidth={3} name="Luxury Car" />
                <Line type="monotone" dataKey="uberCost" stroke="#00A86B" strokeWidth={3} name="Uber + Rental" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Depreciation Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Depreciation Curve (Car Value Over Time)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={depreciationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v) => formatCurrency(v)} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Area type="monotone" dataKey="value" stroke="#b60232" fill="#b6023220" name="Car Value" />
          </AreaChart>
        </ResponsiveContainer>
        <p style={{ fontSize: '12px', color: '#acacac', marginTop: '8px' }}>Your car will be worth ~{formatCurrency(resaleValue)} after 5 years (38% of original value).</p>
      </div>

      {/* Studio Verdict */}
      <div className="card" style={{ backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaMoneyBillWave size={20} color="#F4A261" />
          <h2 style={{ marginBottom: '0', fontSize: '18px' }}>Studio Verdict</h2>
        </div>
        {monthlyDifference > 0 ? (
          <>
            <p>By choosing Uber + investing, you could save approximately <strong>{formatCurrency(fiveYearSavings)}</strong> over 5 years.</p>
            <p>This could grow to <strong>{formatCurrency(investmentValue)}</strong> with {investmentReturn}% returns.</p>
            <p style={{ color: '#00A86B', marginTop: '8px' }}>The alternative + investing option leaves you significantly better off!</p>
          </>
        ) : (
          <>
            <p>The luxury car costs less per month than your alternative transport.</p>
            <p>However, remember that cars are depreciating assets. You'll lose ~62% of value in 5 years.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CarStudio;