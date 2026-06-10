// src/pages/CarStudio.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { FaCar, FaTaxi, FaChartLine, FaInfoCircle, FaMoneyBillWave, FaCalculator, FaArrowDown, FaArrowUp } from "react-icons/fa";

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
    if (carPrice === 0) return 0;
    const n = 60;
    const pvBalloon = balloonAmount / Math.pow(1 + monthlyRate, n);
    const adjustedLoan = loanAmount - pvBalloon;
    if (adjustedLoan <= 0) return 0;
    return adjustedLoan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalFuelCost = carPrice > 0 ? 2500 * 60 : 0;
  const totalInsurance = carPrice > 0 ? (carPrice * 0.03) * 5 : 0;
  const totalMaintenance = carPrice > 0 ? (carPrice * 0.01) * 5 : 0;
  const totalCarCost = deposit + (monthlyPayment * 60) + balloonAmount + totalFuelCost + totalInsurance + totalMaintenance;
  const totalUberCost = uberBudget * 12 * 5;
  const monthlyCarCost = carPrice > 0 ? (monthlyPayment + 2500 + (carPrice * 0.03 / 12) + (carPrice * 0.01 / 12)) : 0;
  const monthlyDifference = monthlyCarCost - uberBudget;
  const fiveYearSavings = monthlyDifference > 0 ? monthlyDifference * 60 : 0;
  
  // Calculate investment growth with compound interest
  const calculateInvestmentValue = () => {
    if (monthlyDifference <= 0) return 0;
    let value = 0;
    for (let month = 1; month <= 60; month++) {
      value += monthlyDifference;
      value = value * (1 + (investmentReturn / 100 / 12));
    }
    return value;
  };
  
  const investmentValue = calculateInvestmentValue();
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
  let cumulativeCarCost = deposit;
  let cumulativeUberCost = 0;
  
  for (let year = 1; year <= 5; year++) {
    cumulativeCarCost += monthlyCarCost * 12;
    cumulativeUberCost += uberBudget * 12;
    comparisonData.push({
      year: year,
      carCost: cumulativeCarCost,
      uberCost: cumulativeUberCost,
    });
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaCar size={28} color="#F4A261" />
          <h1 style={{ marginBottom: '0' }}>Car vs Invest Studio</h1>
        </div>
        <p style={{ color: '#acacac' }}>Compare the true 5-year cost of financing a car vs using Uber and investing the savings.</p>
      </div>

      {/* Educational Note */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#F4A261" />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>What this studio does</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac' }}>
          This calculator compares two paths over 5 years: financing a car versus using Uber and investing the difference.
          Toggle the sliders below to see the true cost of ownership including fuel, insurance, maintenance, and depreciation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Inputs */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalculator size={18} /> Adjust Your Numbers</h2>
          
          <div style={{ marginBottom: '14px' }}>
            <label>Car Price (ZAR)</label>
            <input type="range" min="0" max="1200000" step="50000" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(carPrice)}</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Deposit (ZAR)</label>
            <input type="range" min="0" max={carPrice * 0.3} step="10000" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(deposit)} ({carPrice > 0 ? Math.round((deposit / carPrice) * 100) : 0}%)</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Interest Rate (%)</label>
            <input type="range" min="0" max="18" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{interestRate}% (SA prime: 11.75%)</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Balloon Payment (%)</label>
            <input type="range" min="0" max="40" step="5" value={balloonPayment} onChange={(e) => setBalloonPayment(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{balloonPayment}% = {formatCurrency(balloonAmount)} due at end</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Monthly Uber/Taxi Budget (ZAR)</label>
            <input type="range" min="0" max="8000" step="500" value={uberBudget} onChange={(e) => setUberBudget(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(uberBudget)} / month</p>
          </div>

          <div>
            <label>Investment Return (% per year)</label>
            <input type="range" min="0" max="15" step="0.5" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{investmentReturn}% per year</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)} className="btn-secondary" style={{ marginTop: '16px', width: '100%', padding: '8px' }}>
            {showDetails ? 'Hide SA Context Details ▲' : 'Show SA Context Details ▼'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '8px' }}>South African Context</p>
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
          
          {/* Side by side summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaCar size={16} color="#F4A261" />
                <h3 style={{ fontSize: '16px', color: '#F4A261', marginBottom: '0' }}>Buying a Car</h3>
              </div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Monthly Payment: <strong>{formatCurrency(monthlyPayment)}</strong></p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Final Balloon: {formatCurrency(balloonAmount)}</p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Fuel (5 yrs): {formatCurrency(totalFuelCost)}</p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Insurance + Maintenance: {formatCurrency(totalInsurance + totalMaintenance)}</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4A261', marginTop: '8px' }}>Total Cost: {formatCurrency(totalCarCost)}</p>
              <p style={{ fontSize: '11px', color: '#acacac', marginTop: '4px' }}>Resale value: {formatCurrency(resaleValue)}</p>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaTaxi size={16} color="#00A86B" />
                <h3 style={{ fontSize: '16px', color: '#00A86B', marginBottom: '0' }}>Uber + Invest</h3>
              </div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Monthly Budget: <strong>{formatCurrency(uberBudget)}</strong></p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Total 5-Year Cost: {formatCurrency(totalUberCost)}</p>
              {monthlyDifference > 0 && (
                <p style={{ fontSize: '12px', color: '#00A86B', marginBottom: '4px' }}>Monthly Saved: {formatCurrency(monthlyDifference)}</p>
              )}
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#00A86B', marginTop: '8px' }}>Investment Value: {formatCurrency(investmentValue)}</p>
            </div>
          </div>

          {/* Monthly difference explanation */}
          <div style={{ marginBottom: '20px', padding: "12px", backgroundColor: '#1a1a2e', borderRadius: '8px' }}>
            {monthlyDifference > 0 ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaArrowDown size={14} color="#00A86B" />
                  <p style={{ fontSize: '12px', color: '#00A86B', margin: 0 }}>Uber is cheaper by {formatCurrency(monthlyDifference)} per month</p>
                </div>
                <p style={{ fontSize: '11px', color: '#acacac', marginLeft: '22px' }}>
                  This {formatCurrency(monthlyDifference)} monthly saving is invested and grows at {investmentReturn}% per year.
                  After 5 years, this grows to {formatCurrency(investmentValue)}.
                </p>
              </>
            ) : monthlyDifference < 0 ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaArrowDown size={14} color="#b60232" />
                  <p style={{ fontSize: '12px', color: '#b60232', margin: 0 }}>Car is cheaper by {formatCurrency(Math.abs(monthlyDifference))} per month</p>
                </div>
                <p style={{ fontSize: '11px', color: '#acacac', marginLeft: '22px' }}>
                  The car costs less each month, but remember you lose money to depreciation.
                </p>
              </>
            ) : (
              <p style={{ fontSize: '12px', color: '#acacac', textAlign: 'center' }}>
                The monthly cost of owning a car and using Uber are equal.
              </p>
            )}
          </div>

          {/* Chart - 5-Year Cost Comparison */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FaMoneyBillWave size={14} color="#F4A261" />
              <h3 style={{ fontSize: '14px', marginBottom: '0' }}>5-Year Cost Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={comparisonData} margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `R${(v/1000).toFixed(0)}k`} width={55} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Line type="monotone" dataKey="carCost" stroke="#F4A261" strokeWidth={3} name="Car Ownership" />
                <Line type="monotone" dataKey="uberCost" stroke="#00A86B" strokeWidth={3} name="Uber + Invest" />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontSize: '10px', color: '#acacac', textAlign: 'center', marginTop: '4px' }}>
              Total money spent over 5 years (car path includes balloon payment at end)
            </p>
          </div>
        </div>
      </div>

      {/* Depreciation Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <FaChartLine size={14} color="#b60232" />
          <h3 style={{ marginBottom: '0' }}>Depreciation Curve (Car Value Over Time)</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={depreciationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v) => formatCurrency(v)} width={80} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Area type="monotone" dataKey="value" stroke="#b60232" fill="#b6023220" name="Car Value" />
          </AreaChart>
        </ResponsiveContainer>
        <p style={{ fontSize: '12px', color: '#acacac', marginTop: '8px' }}>
          Your car will be worth ~{formatCurrency(resaleValue)} after 5 years ({carPrice > 0 ? Math.round((resaleValue / carPrice) * 100) : 0}% of original value).
          New cars lose 20-30% in the first year alone.
        </p>
      </div>

      {/* Studio Verdict */}
      <div className="card" style={{ backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaMoneyBillWave size={20} color="#F4A261" />
          <h2 style={{ marginBottom: '0', fontSize: '18px' }}>Studio Verdict</h2>
        </div>
        {monthlyDifference > 0 && carPrice > 0 ? (
          <>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#00A86B', marginBottom: '8px' }}>
              By choosing Uber + investing, you could save approximately {formatCurrency(fiveYearSavings)} over 5 years.
            </p>
            <p>This could grow to <strong>{formatCurrency(investmentValue)}</strong> with {investmentReturn}% annual returns.</p>
            <p style={{ color: '#00A86B', marginTop: '8px' }}>The Uber + investing option leaves you significantly better off!</p>
          </>
        ) : carPrice === 0 ? (
          <p>Enter a car price to see the comparison.</p>
        ) : (
          <>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#F4A261', marginBottom: '8px' }}>
              The car costs {formatCurrency(Math.abs(monthlyDifference))} less per month than Uber.
            </p>
            <p>However, remember that cars are depreciating assets. You'll lose about 62% of the car's value in 5 years.</p>
            <p style={{ color: '#acacac', marginTop: '8px' }}>Consider if the convenience of owning a car is worth the depreciation cost.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CarStudio;