// src/pages/AggressiveTrack.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaGlobe, FaChartLine, FaDollarSign, FaRocket, FaCheckCircle, FaSpinner, FaCircle, FaInfoCircle, FaMapMarker, FaLightbulb, FaExclamationTriangle, FaExchangeAlt, FaQuestionCircle } from "react-icons/fa";

function AggressiveTrack() {
  const { userData, updateTrackProgress } = useContext(AuthContext);
  const progress = userData.trackProgress.aggressive || {
    milestone1: "not-started", milestone2: "not-started", milestone3: "not-started", milestone4: "not-started", milestone5: "not-started"
  };
  const [showTips, setShowTips] = useState({});
  const [exchangeRate, setExchangeRate] = useState(18.5);

  const hasValidIncome = userData.grossMonthlyIncome > 0;

  const milestones = [
    { id: "milestone1", name: "Max Out TFSA", year: "Year 1", targetDate: "February 2026", icon: <FaChartLine />, description: "Contribute R46,000 to your TFSA", tip: "R46,000/year grows tax-free. Invest in global ETFs." },
    { id: "milestone2", name: "Open Offshore Account", year: "Year 2", targetDate: "December 2026", icon: <FaGlobe />, description: "Open international investment account", tip: "Use EasyEquities USD. Transfer up to R1M/year offshore." },
    { id: "milestone3", name: "40% Offshore Allocation", year: "Year 3", targetDate: "December 2027", icon: <FaExchangeAlt />, description: "Achieve 40% offshore allocation", tip: "Diversify across US, Europe, and Emerging Markets." },
    { id: "milestone4", name: "Direct USD/EUR Exposure", year: "Year 4", targetDate: "December 2028", icon: <FaDollarSign />, description: "Direct USD/EUR investments", tip: "Invest in individual US stocks like Apple, Nvidia." },
    { id: "milestone5", name: "R1 Million Portfolio", year: "Year 5", targetDate: "December 2029", icon: <FaRocket />, description: "Grow portfolio to R1 million", tip: "Rebalance annually. Consider a Retirement Annuity." },
  ];

  const toggleTip = (id) => setShowTips(prev => ({ ...prev, [id]: !prev[id] }));

  const getStatusIcon = (status) => {
    if (status === "completed") return <FaCheckCircle color="#00A86B" size={18} />;
    if (status === "in-progress") return <FaSpinner color="#F4A261" size={18} />;
    return <FaCircle color="#acacac" size={18} />;
  };

  const getStatusText = (status) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Not Started";
  };

  const handleStatusChange = (milestoneId, currentStatus) => {
    let newStatus;
    if (currentStatus === "not-started") newStatus = "in-progress";
    else if (currentStatus === "in-progress") newStatus = "completed";
    else newStatus = "not-started";
    updateTrackProgress("aggressive", milestoneId, newStatus);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);

  const totalInvestments = (userData.investments || 0) + (userData.currentSavings || 0);
  const portfolioProgress = Math.min((totalInvestments / 1000000) * 100, 100);
  const completedCount = milestones.filter(m => progress[m.id] === "completed").length;
  const overallProgress = (completedCount / milestones.length) * 100;
  const nextMilestone = milestones.find(m => progress[m.id] !== "completed");
  const currencyImpact = ((exchangeRate - 18.5) / 18.5) * 100;

  return (
    <div>
      {/* DATA SOURCE CARD - EXPLAINS WHERE NUMBERS COME FROM */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaQuestionCircle size={20} color="#F4A261" />
            <div>
              <h3 style={{ marginBottom: '4px', fontSize: '16px' }}>How this track works</h3>
              <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '4px' }}>
                • <strong>Total Invested</strong>: Current Savings + Investments (from Money Snapshot)
              </p>
              <p style={{ fontSize: '12px', color: '#acacac' }}>
                • <strong>R1M Goal</strong>: Track your progress toward a R1,000,000 portfolio
              </p>
            </div>
          </div>
          <Link to="/money-snapshot" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
            Update in Money Snapshot 
          </Link>
        </div>
      </div>

      {!hasValidIncome && (
        <div className="card" style={{ backgroundColor: '#b6023220', borderLeft: '4px solid #b60232', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaExclamationTriangle size={24} color="#b60232" />
            <div>
              <h3 style={{ color: '#b60232', marginBottom: '4px' }}>Income Data Missing</h3>
              <p style={{ color: '#acacac' }}>Enter your income in Money Snapshot to see investment recommendations.</p>
              <Link to="/money-snapshot" className="btn-primary" style={{ marginTop: '8px', display: 'inline-block' }}>Go to Money Snapshot</Link>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaRocket size={28} color="#F4A261" />
          <h1 style={{ marginBottom: '0' }}>Aggressive Global Track</h1>
        </div>
        <p style={{ color: '#acacac' }}>Maximise growth through offshore diversification</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div style={{ backgroundColor: '#2d2729', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#F4A261', width: `${overallProgress}%`, height: '100%', transition: 'width 0.5s ease' }}></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{completedCount}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Milestones Done</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{Math.round(portfolioProgress)}%</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>R1M Goal</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{formatCurrency(totalInvestments)}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Total Invested</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{((totalInvestments / 1000000) * 100).toFixed(0)}%</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>to Goal</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaExchangeAlt size={16} /> Currency Impact Simulator</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label>Rand/USD Rate: R{exchangeRate}</label>
            <input type="range" min="15" max="25" step="0.5" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#2d2729', borderRadius: '12px', minWidth: '150px' }}>
            <p style={{ fontSize: '11px', color: '#acacac' }}>Impact on R100,000</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: currencyImpact > 0 ? '#00A86B' : '#b60232' }}>{currencyImpact > 0 ? `+${currencyImpact.toFixed(1)}%` : `${currencyImpact.toFixed(1)}%`}</p>
            <p style={{ fontSize: '11px', color: '#acacac' }}>= {formatCurrency(100000 * (1 + currencyImpact / 100))}</p>
          </div>
        </div>
      </div>

      {nextMilestone && (
        <div className="card" style={{ marginBottom: '24px', backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FaMapMarker color="#F4A261" />
            <h3 style={{ marginBottom: '0', fontSize: '16px' }}>Next Milestone</h3>
          </div>
          <p style={{ fontWeight: 'bold' }}>{nextMilestone.name}</p>
          <p style={{ fontSize: '13px', color: '#acacac' }}>{nextMilestone.description}</p>
          <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>Target: {nextMilestone.targetDate}</p>
          <button className="btn-primary" style={{ marginTop: '12px' }} onClick={() => { if (nextMilestone && progress[nextMilestone.id] === "not-started") handleStatusChange(nextMilestone.id, "not-started"); }}>Start Milestone →</button>
        </div>
      )}

      <div className="card">
        <h2>Milestones</h2>
        {milestones.map((milestone) => (
          <div key={milestone.id} style={{ padding: '14px 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                {getStatusIcon(progress[milestone.id])}
                <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{milestone.name}</span>
                <span style={{ fontSize: '10px', color: '#acacac' }}>({milestone.year})</span>
              </div>
              <p style={{ fontSize: '13px', color: '#acacac' }}>{milestone.description}</p>
              <button onClick={() => toggleTip(milestone.id)} style={{ background: 'none', border: 'none', color: '#F4A261', fontSize: '11px', cursor: 'pointer', marginTop: '4px' }}>
                {showTips[milestone.id] ? 'Hide Tip ▲' : 'Show Tip ▼'}
              </button>
              {showTips[milestone.id] && (<div style={{ marginTop: '6px', padding: '10px', backgroundColor: '#2d2729', borderRadius: '8px' }}><p style={{ fontSize: '12px', color: '#acacac' }}><FaLightbulb size={12} style={{ marginRight: '6px' }} />{milestone.tip}</p></div>)}
            </div>
            <button onClick={() => handleStatusChange(milestone.id, progress[milestone.id])}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '12px', minWidth: '100px',
                backgroundColor: progress[milestone.id] === "completed" ? "#00A86B" : progress[milestone.id] === "in-progress" ? "#F4A261" : "#2d2729",
                color: progress[milestone.id] === "not-started" ? "#acacac" : "white" }}>
              {getStatusText(progress[milestone.id])}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AggressiveTrack;