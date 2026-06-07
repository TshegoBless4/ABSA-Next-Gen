// src/pages/LocalOffshoreStudio.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaGlobe, FaChartLine, FaExchangeAlt, FaInfoCircle, FaMoneyBillWave, FaCalculator } from "react-icons/fa";

function LocalOffshoreStudio() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [localAllocation, setLocalAllocation] = useState(60);
  const [years, setYears] = useState(5);
  const [exchangeRate, setExchangeRate] = useState(18.5);
  const [localReturn, setLocalReturn] = useState(9);
  const [offshoreReturn, setOffshoreReturn] = useState(10);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);

  const offshoreAllocation = 100 - localAllocation;
  const totalInvested = monthlyInvestment * 12 * years;
  
  const calculateCompound = (principal, rate, years) => principal * Math.pow(1 + rate / 100, years);
  
  const localPrincipal = totalInvested * (localAllocation / 100);
  const offshorePrincipal = totalInvested * (offshoreAllocation / 100);
  
  const localValue = calculateCompound(localPrincipal, localReturn, years);
  const offshoreValueInUSD = calculateCompound(offshorePrincipal / exchangeRate, offshoreReturn, years);
  const offshoreValue = offshoreValueInUSD * exchangeRate;
  const totalValue = localValue + offshoreValue;
  const gain = totalValue - totalInvested;

  const growthData = [];
  for (let y = 1; y <= years; y++) {
    growthData.push({
      year: y,
      local: calculateCompound(localPrincipal, localReturn, y),
      offshore: calculateCompound(offshorePrincipal / exchangeRate, offshoreReturn, y) * exchangeRate,
      total: calculateCompound(localPrincipal, localReturn, y) + calculateCompound(offshorePrincipal / exchangeRate, offshoreReturn, y) * exchangeRate,
    });
  }

  const currencyImpact = ((exchangeRate - 18.5) / 18.5) * 100;

  const getVerdict = () => {
    if (offshoreAllocation > 60) {
      return "With high offshore allocation, you're well-protected against rand weakness but exposed to currency risk.";
    } else if (localAllocation > 70) {
      return "With high local allocation, you're exposed to rand risk. Consider adding offshore exposure to diversify.";
    } else {
      return "Your balanced allocation provides good diversification between local and offshore markets.";
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaGlobe size={28} color="#00A86B" />
          <h1 style={{ marginBottom: '0' }}>Local vs Offshore Studio</h1>
        </div>
        <p style={{ color: '#acacac' }}>Compare different investment allocation strategies and see the impact of currency movements.</p>
      </div>

      {/* Educational Note */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#00A86B" />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>What this studio does</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac' }}>
          This calculator compares different investment allocation strategies between local and offshore markets.
          See how currency movements impact your returns and get a personalized recommendation based on your allocation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Inputs */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalculator size={18} /> Adjust Your Numbers</h2>
          
          <div style={{ marginBottom: '14px' }}>
            <label>Monthly Investment (ZAR)</label>
            <input type="range" min="1000" max="20000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{formatCurrency(monthlyInvestment)} / month</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Local Allocation (%)</label>
            <input type="range" min="0" max="100" step="5" value={localAllocation} onChange={(e) => setLocalAllocation(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{localAllocation}% Local / {offshoreAllocation}% Offshore</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Time Horizon (Years)</label>
            <input type="range" min="1" max="15" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{years} years</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Exchange Rate (R/USD)</label>
            <input type="range" min="15" max="25" step="0.5" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>R{exchangeRate}/USD</p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Local Expected Return (%)</label>
            <input type="range" min="5" max="15" step="0.5" value={localReturn} onChange={(e) => setLocalReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{localReturn}% per year</p>
          </div>

          <div>
            <label>Offshore Expected Return (%)</label>
            <input type="range" min="5" max="15" step="0.5" value={offshoreReturn} onChange={(e) => setOffshoreReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#acacac' }}>{offshoreReturn}% per year</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)} className="btn-secondary" style={{ marginTop: '16px', width: '100%', padding: '8px' }}>
            {showDetails ? 'Hide SA Context Details ▲' : 'Show SA Context Details ▼'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#00A86B', marginBottom: '8px' }}>🇿🇦 South African Context</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• TFSA annual limit: R46,000</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• TFSA lifetime limit: R500,000</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• RA deduction: 27.5% of taxable income</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Offshore allowance: R1M/year</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Platforms: EasyEquities, Sygnia, Allan Gray</p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaChartLine size={18} /> Projected Portfolio Value</h2>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#00A86B" }}>{formatCurrency(totalValue)}</p>
            <p style={{ fontSize: '12px', color: '#acacac' }}>After {years} years</p>
          </div>

          <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px", marginBottom: "16px" }}>
            <p><strong>Total Invested:</strong> {formatCurrency(totalInvested)}</p>
            <p><strong>Total Gain:</strong> {formatCurrency(gain)}</p>
            <p><strong>Return on Investment:</strong> {((gain / totalInvested) * 100).toFixed(1)}%</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: "12px", backgroundColor: "#003366", borderRadius: "8px", textAlign: 'center' }}>
              <p><strong>Local Portfolio</strong></p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCurrency(localValue)}</p>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#00A86B", borderRadius: "8px", textAlign: 'center' }}>
              <p><strong>Offshore Portfolio</strong></p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCurrency(offshoreValue)}</p>
            </div>
          </div>

          {/* Chart */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Portfolio Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Line type="monotone" dataKey="local" stroke="#003366" strokeWidth={2} name="Local Portfolio" />
                <Line type="monotone" dataKey="offshore" stroke="#00A86B" strokeWidth={2} name="Offshore Portfolio" />
                <Line type="monotone" dataKey="total" stroke="#F4A261" strokeWidth={2} name="Total Portfolio" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Currency Impact Analysis */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}><FaExchangeAlt size={16} /> Currency Impact Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#acacac' }}>Current Exchange Rate</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>R{exchangeRate}/USD</p>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#acacac' }}>Currency Impact on R100k</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: currencyImpact > 0 ? '#00A86B' : '#b60232' }}>
              {currencyImpact > 0 ? `+${currencyImpact.toFixed(1)}%` : `${currencyImpact.toFixed(1)}%`}
            </p>
          </div>
        </div>
      </div>

      {/* Studio Verdict */}
      <div className="card" style={{ backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaMoneyBillWave size={20} color="#F4A261" />
          <h2 style={{ marginBottom: '0', fontSize: '18px' }}>Studio Verdict</h2>
        </div>
        <p>{getVerdict()}</p>
        <p style={{ fontSize: '12px', color: '#acacac', marginTop: '8px' }}>
          ⓘ When the rand weakens, your offshore investments increase in value. Since 2020, the rand has weakened from ~R15 to ~R19/USD.
        </p>
      </div>
    </div>
  );
}

export default LocalOffshoreStudio;