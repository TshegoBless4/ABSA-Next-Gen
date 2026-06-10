// src/pages/PropertyStudio.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaHome, FaChartLine, FaInfoCircle, FaCalculator, FaMoneyBillWave, FaBuilding, FaHandHoldingUsd, FaChartArea, FaArrowDown, FaArrowUp } from "react-icons/fa";

function PropertyStudio() {
  const [rent, setRent] = useState(12000);
  const [propertyValue, setPropertyValue] = useState(1800000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [investmentReturn, setInvestmentReturn] = useState(10);
  const [propertyAppreciation, setPropertyAppreciation] = useState(5);
  const [rentalInflation, setRentalInflation] = useState(6);
  const [monthlyLevies, setMonthlyLevies] = useState(2500);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);
  };

  const deposit = propertyValue * (depositPercent / 100);
  const monthlyBond = propertyValue * 0.009;
  const transferDuty = propertyValue > 1100000 ? Math.min(propertyValue * 0.05, 46000) : 0;
  const bondFees = 30000;
  const monthlyMaintenance = propertyValue * 0.01 / 12;
  const totalMonthlyBuying = monthlyBond + monthlyLevies + monthlyMaintenance;
  const monthlyDiff = totalMonthlyBuying - rent;

  // Calculate data for each year (Years 1-5)
  const chartData = [];
  let currentRent = rent;
  let investmentPortfolio = 0;
  let propertyEquity = propertyValue;
  let buyingCostCumulative = deposit + transferDuty + bondFees;
  let rentingCostCumulative = 0;

  for (let year = 1; year <= 5; year++) {
    buyingCostCumulative += totalMonthlyBuying * 12;
    rentingCostCumulative += currentRent * 12;
    
    if (monthlyDiff > 0) {
      investmentPortfolio += monthlyDiff * 12;
      investmentPortfolio = investmentPortfolio * (1 + investmentReturn / 100);
    }
    
    propertyEquity = propertyEquity * (1 + propertyAppreciation / 100);
    
    const buyingNetPosition = propertyEquity - buyingCostCumulative;
    const rentingNetPosition = investmentPortfolio - rentingCostCumulative;
    
    chartData.push({
      year: `Year ${year}`,
      buyingCost: buyingCostCumulative,
      rentingCost: rentingCostCumulative,
      buyingNetPosition: buyingNetPosition,
      rentingNetPosition: rentingNetPosition,
      propertyValue: propertyEquity,
      investmentValue: investmentPortfolio,
    });
    
    currentRent = currentRent * (1 + rentalInflation / 100);
  }

  const finalData = chartData[4];
  const buyingBetter = finalData.buyingNetPosition > finalData.rentingNetPosition;
  const difference = Math.abs(finalData.buyingNetPosition - finalData.rentingNetPosition);

  const getVerdict = () => {
    if (buyingBetter) {
      return {
        verdict: `After 5 years, buying leaves you ${formatCurrency(difference)} better off than renting.`,
        recommendation: "Buying makes financial sense for your situation, especially if you plan to stay longer."
      };
    } else if (monthlyDiff > 0) {
      return {
        verdict: `After 5 years, renting and investing leaves you ${formatCurrency(difference)} better off than buying.`,
        recommendation: "Consider continuing to rent and invest the monthly difference in a diversified portfolio."
      };
    } else {
      return {
        verdict: "The monthly cost of buying is similar to renting.",
        recommendation: "Consider non-financial factors like stability, freedom to modify, and long-term plans."
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
        <p style={{ color: '#acacac' }}>Compare buying a property vs renting and investing the difference over 5 years.</p>
      </div>

      {/* Educational Note */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#F4A261" />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>What this studio does</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac' }}>
          This calculator compares two paths over 5 years:
        </p>
        <div style={{ fontSize: '12px', color: '#acacac', marginTop: '8px', paddingLeft: '20px' }}>
          <p style={{ marginBottom: '4px' }}>• <strong style={{ color: '#b60232' }}>Path A: Buy a property</strong> - Pay bond, levies, maintenance, transfer duty. Build property equity.</p>
          <p style={{ marginBottom: '4px' }}>• <strong style={{ color: '#00A86B' }}>Path B: Rent + Invest</strong> - Pay rent (which increases yearly) and invest the monthly difference.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Input Panel */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalculator size={18} /> Adjust Your Numbers</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label>Monthly Rent (ZAR)</label>
            <input type="range" min="0" max="35000" step="500" value={rent} onChange={(e) => setRent(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{formatCurrency(rent)} / month</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Property Value (ZAR)</label>
            <input type="range" min="0" max="5000000" step="50000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{formatCurrency(propertyValue)}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Deposit Percentage (%)</label>
            <input type="range" min="0" max="30" step="1" value={depositPercent} onChange={(e) => setDepositPercent(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{depositPercent}% ({formatCurrency(deposit)})</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Monthly Levies (ZAR)</label>
            <input type="range" min="0" max="6000" step="250" value={monthlyLevies} onChange={(e) => setMonthlyLevies(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{formatCurrency(monthlyLevies)} / month</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Property Appreciation (% per year)</label>
            <input type="range" min="0" max="8" step="0.5" value={propertyAppreciation} onChange={(e) => setPropertyAppreciation(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{propertyAppreciation}% per year</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Rental Inflation (% per year)</label>
            <input type="range" min="0" max="10" step="0.5" value={rentalInflation} onChange={(e) => setRentalInflation(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{rentalInflation}% per year</p>
          </div>

          <div>
            <label>Investment Return (% per year)</label>
            <input type="range" min="0" max="15" step="0.5" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ marginTop: '4px', color: '#acacac' }}>{investmentReturn}% per year</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)} className="btn-secondary" style={{ marginTop: '16px', width: '100%', padding: '8px' }}>
            {showDetails ? 'Hide SA Context Details ▲' : 'Show SA Context Details ▼'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#2d2729', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '8px' }}>South African Context</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Transfer duty: ~{formatCurrency(transferDuty)} for R1.8M property</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Bond registration fees: ~{formatCurrency(bondFees)}</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Maintenance: 1% of property value/year</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Monthly levies: R2,000–R4,000 (sectional title)</p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>• Prime rate: 11.75%</p>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaChartLine size={18} /> 5-Year Comparison</h2>
          
          {/* Side by side summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaBuilding size={16} color="#b60232" />
                <h3 style={{ fontSize: '16px', color: '#b60232', marginBottom: '0' }}>Buying</h3>
              </div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Monthly Cost: <strong>{formatCurrency(totalMonthlyBuying)}</strong></p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Deposit + Fees: {formatCurrency(deposit + transferDuty + bondFees)}</p>
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '4px' }}>Property Value (Year 5): {formatCurrency(finalData?.propertyValue || 0)}</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#b60232', marginTop: '8px' }}>Net Position: {formatCurrency(finalData?.buyingNetPosition || 0)}</p>
            </div>
            <div style={{ padding: "12px", backgroundColor: "#2d2729", borderRadius: "8px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaHandHoldingUsd size={16} color="#00A86B" />
                <h3 style={{ fontSize: '16px', color: '#00A86B', marginBottom: '0' }}>Rent + Invest</h3>
              </div>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Current Rent: <strong>{formatCurrency(rent)}</strong></p>
              {monthlyDiff > 0 && <p style={{ fontSize: '12px', marginBottom: '4px' }}>Monthly Invested: {formatCurrency(monthlyDiff)}</p>}
              <p style={{ fontSize: '12px', color: '#F4A261', marginBottom: '4px' }}>Investment Value (Year 5): {formatCurrency(finalData?.investmentValue || 0)}</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#00A86B', marginTop: '8px' }}>Net Position: {formatCurrency(finalData?.rentingNetPosition || 0)}</p>
            </div>
          </div>

          {/* Monthly difference explanation */}
          <div style={{ marginBottom: '20px', padding: "12px", backgroundColor: '#1a1a2e', borderRadius: '8px' }}>
            {monthlyDiff > 0 ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaArrowDown size={14} color="#00A86B" />
                  <p style={{ fontSize: '12px', color: '#00A86B', margin: 0 }}>Renting is cheaper by {formatCurrency(monthlyDiff)} per month</p>
                </div>
                <p style={{ fontSize: '11px', color: '#acacac', marginLeft: '22px' }}>
                  This {formatCurrency(monthlyDiff)} monthly saving is invested and grows at {investmentReturn}% per year.
                  After 5 years, this grows to {formatCurrency(finalData?.investmentValue || 0)}.
                </p>
              </>
            ) : monthlyDiff < 0 ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FaArrowDown size={14} color="#b60232" />
                  <p style={{ fontSize: '12px', color: '#b60232', margin: 0 }}>Buying is cheaper by {formatCurrency(Math.abs(monthlyDiff))} per month</p>
                </div>
                <p style={{ fontSize: '11px', color: '#acacac', marginLeft: '22px' }}>
                  Buying costs less each month, which means more money stays in your pocket.
                </p>
              </>
            ) : (
              <p style={{ fontSize: '12px', color: '#acacac', textAlign: 'center' }}>
                The monthly cost of buying and renting are equal.
              </p>
            )}
          </div>

          {/* Chart - 5-Year Cost Comparison */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FaMoneyBillWave size={14} color="#F4A261" />
              <h3 style={{ fontSize: '14px', marginBottom: '0' }}>5-Year Cost Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`} 
                  width={55}
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="buyingCost" stroke="#b60232" strokeWidth={3} name="Total Spent (Buying)" />
                <Line type="monotone" dataKey="rentingCost" stroke="#F4A261" strokeWidth={3} name="Total Rent Paid" />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontSize: '10px', color: '#acacac', textAlign: 'center', marginTop: '4px' }}>
              Total money spent over 5 years (does not include property value or investment growth)
            </p>
          </div>

          {/* Chart - Net Worth Comparison */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FaChartArea size={14} color="#00A86B" />
              <h3 style={{ fontSize: '14px', marginBottom: '0' }}>5-Year Net Worth Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`} 
                  width={55}
                />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="buyingNetPosition" stroke="#b60232" strokeWidth={3} name="Buying Net Worth" />
                <Line type="monotone" dataKey="rentingNetPosition" stroke="#00A86B" strokeWidth={3} name="Renting + Investing Net Worth" />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontSize: '10px', color: '#acacac', textAlign: 'center', marginTop: '4px' }}>
              Net worth = (Property value OR Investment value) minus total costs paid
            </p>
            <p style={{ fontSize: '10px', color: '#acacac', textAlign: 'center' }}>
              A higher line means better financial position after that year.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Verdict */}
      <div className="card" style={{ marginTop: '24px', backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaMoneyBillWave size={20} color="#F4A261" />
          <h2 style={{ marginBottom: '0', fontSize: '18px' }}>Studio Verdict</h2>
        </div>
        <p style={{ marginBottom: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{verdict.verdict}</p>
        <p style={{ fontSize: '13px', color: '#acacac' }}>{verdict.recommendation}</p>
        
        {/* Summary table */}
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#1a1a2e', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>5-Year Summary</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#acacac' }}>Buying:</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#b60232' }}>{formatCurrency(finalData?.buyingNetPosition || 0)}</p>
              <p style={{ fontSize: '10px', color: '#acacac' }}>Net Position</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#acacac' }}>Renting + Investing:</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#00A86B' }}>{formatCurrency(finalData?.rentingNetPosition || 0)}</p>
              <p style={{ fontSize: '10px', color: '#acacac' }}>Net Position</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#acacac' }}>Difference:</p>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4A261' }}>{formatCurrency(difference)}</p>
              <p style={{ fontSize: '10px', color: '#acacac' }}>{buyingBetter ? 'Buying wins' : 'Renting wins'}</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '11px', color: '#acacac', marginTop: '12px' }}>
          Note: Calculations assume a 20-year bond at approximately 9% interest, property appreciation of {propertyAppreciation}% per year, 
          rental inflation of {rentalInflation}% per year, and an investment return of {investmentReturn}% per year.
        </p>
      </div>
    </div>
  );
}

export default PropertyStudio;