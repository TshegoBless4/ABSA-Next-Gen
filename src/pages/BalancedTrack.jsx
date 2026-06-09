// src/pages/BalancedTrack.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaBalanceScale, FaChartLine, FaPiggyBank, FaGlobe, FaCheckCircle, FaSpinner, FaCircle, FaInfoCircle, FaMapMarker, FaLightbulb, FaExclamationTriangle, FaPercent, FaQuestionCircle } from "react-icons/fa";

function BalancedTrack() {
  const { userData, updateTrackProgress, netPay } = useContext(AuthContext);
  const progress = userData.trackProgress.balanced || {
    milestone1: "not-started", milestone2: "not-started", milestone3: "not-started", milestone4: "not-started", milestone5: "not-started"
  };
  const [showTips, setShowTips] = useState({});

  const hasValidIncome = userData.grossMonthlyIncome > 0;

  // FIXED: Get emergency fund data - checks both key formats
  const getEmergencyFundData = () => {
    const target = userData.emergencyFundTarget || userData.emergencyfundTarget || 0;
    const current = userData.emergencyFundCurrent || userData.emergencyfundCurrent || 0;
    return { target, current };
  };

  const emergencyData = getEmergencyFundData();
  const emergencyProgress = emergencyData.target > 0 ? Math.min((emergencyData.current / emergencyData.target) * 100, 100) : 0;

  const milestones = [
    { id: "milestone1", name: "Build Emergency Fund", year: "Year 1", targetDate: "December 2025", icon: <FaPiggyBank />, description: "Save 3-6 months of living expenses", tip: "Keep emergency fund in a high-interest savings account." },
    { id: "milestone2", name: "Start Investing", year: "Year 2", targetDate: "December 2026", icon: <FaChartLine />, description: "Open TFSA and start monthly contributions", tip: "Max out TFSA first (R46,000/year) - all growth is tax-free!" },
    { id: "milestone3", name: "Diversify Portfolio", year: "Year 3", targetDate: "December 2027", icon: <FaGlobe />, description: "Add offshore exposure", tip: "Open EasyEquities USD account. Aim for 30-40% offshore allocation." },
    { id: "milestone4", name: "Grow Investments", year: "Year 4", targetDate: "December 2028", icon: <FaBalanceScale />, description: "Reach R300,000+ portfolio", tip: "Rebalance annually. Consider a Retirement Annuity." },
    { id: "milestone5", name: "Passive Income", year: "Year 5", targetDate: "December 2029", icon: <FaPercent />, description: "Generate passive income", tip: "Aim for dividend-paying ETFs or property REITs." },
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
    updateTrackProgress("balanced", milestoneId, newStatus);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);

  const investmentProgress = 300000 > 0 ? Math.min(((userData.investments || 0) / 300000) * 100, 100) : 0;
  const completedCount = milestones.filter(m => progress[m.id] === "completed").length;
  const overallProgress = (completedCount / milestones.length) * 100;
  const nextMilestone = milestones.find(m => progress[m.id] !== "completed");

  const fiftyPercent = netPay * 0.5;
  const thirtyPercent = netPay * 0.3;
  const twentyPercent = netPay * 0.2;
  const currentNeeds = (userData.rent || 0) + (userData.vehicleFinance || 0) + (userData.insurance || 0) + (userData.medicalAid || 0);
  const currentWants = userData.subscriptions || 0;
  const currentSavings = userData.monthlySavings || 0;

  return (
    <div>
      {/* DATA SOURCE CARD */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620', borderLeft: '4px solid #00A86B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaQuestionCircle size={20} color="#00A86B" />
            <div>
              <h3 style={{ marginBottom: '4px', fontSize: '16px' }}>How this track works</h3>
              <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '4px' }}>
                • <strong>Needs</strong>: Rent + Vehicle + Insurance + Medical Aid (from Money Snapshot)
              </p>
              <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '4px' }}>
                • <strong>Wants</strong>: Subscriptions (from Money Snapshot)
              </p>
              <p style={{ fontSize: '12px', color: '#acacac' }}>
                • <strong>Savings</strong>: Your monthly savings contribution (set in Money Snapshot)
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
              <p style={{ color: '#acacac' }}>Please enter your income in Money Snapshot to see your 50/30/20 breakdown.</p>
              <Link to="/money-snapshot" className="btn-primary" style={{ marginTop: '8px', display: 'inline-block' }}>Go to Money Snapshot</Link>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaBalanceScale size={28} color="#00A86B" />
          <h1 style={{ marginBottom: '0' }}>Balanced Lifestyle Track</h1>
        </div>
        <p style={{ color: '#acacac' }}>Build wealth while enjoying life using the 50/30/20 rule</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div style={{ backgroundColor: '#2d2729', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#00A86B', width: `${overallProgress}%`, height: '100%', transition: 'width 0.5s ease' }}></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00A86B' }}>{completedCount}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Milestones Done</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00A86B' }}>{Math.round(emergencyProgress)}%</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Emergency Fund</p>
          {emergencyData.target === 0 && <p style={{ fontSize: '9px', color: '#acacac' }}>Set goal in Money Snapshot</p>}
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00A86B' }}>{Math.round(investmentProgress)}%</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Investment Goal</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00A86B' }}>{formatCurrency(userData.investments || 0)}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Invested to Date</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaPercent size={16} /> The 50/30/20 Rule</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#003366', borderRadius: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>50%</p><p style={{ fontSize: '11px', color: '#acacac' }}>Needs</p>
            <p style={{ fontSize: '10px', color: '#acacac' }}>Rent + Car + Insurance + Medical</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#F4A261', borderRadius: '12px', color: '#1a1a1a' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>30%</p><p style={{ fontSize: '11px', color: '#1a1a1a' }}>Wants</p>
            <p style={{ fontSize: '10px', color: '#1a1a1a' }}>Subscriptions + Entertainment</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#00A86B', borderRadius: '12px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>20%</p><p style={{ fontSize: '11px', color: '#acacac' }}>Savings</p>
            <p style={{ fontSize: '10px', color: '#acacac' }}>Monthly savings you set</p>
          </div>
        </div>
        {hasValidIncome && (
          <div style={{ backgroundColor: '#2d2729', borderRadius: '12px', padding: '16px' }}>
            <p style={{ marginBottom: '8px' }}>Your Breakdown</p>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Needs: {formatCurrency(currentNeeds)}</span>
                <span>Target: {formatCurrency(fiftyPercent)}</span>
                <span style={{ color: currentNeeds <= fiftyPercent ? '#00A86B' : '#b60232' }}>{currentNeeds <= fiftyPercent ? 'On Track' : 'Over budget'}</span>
              </div>
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '6px', height: '6px' }}>
                <div style={{ backgroundColor: '#003366', width: `${Math.min((currentNeeds / fiftyPercent) * 100, 100)}%`, height: '6px', borderRadius: '6px' }}></div>
              </div>
              <p style={{ fontSize: '10px', color: '#acacac', marginTop: '4px' }}>From Money Snapshot: Rent + Vehicle + Insurance + Medical Aid</p>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Wants: {formatCurrency(currentWants)}</span>
                <span>Target: {formatCurrency(thirtyPercent)}</span>
                <span style={{ color: currentWants <= thirtyPercent ? '#00A86B' : '#b60232' }}>{currentWants <= thirtyPercent ? 'On Track' : 'Over budget'}</span>
              </div>
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '6px', height: '6px' }}>
                <div style={{ backgroundColor: '#F4A261', width: `${Math.min((currentWants / thirtyPercent) * 100, 100)}%`, height: '6px', borderRadius: '6px' }}></div>
              </div>
              <p style={{ fontSize: '10px', color: '#acacac', marginTop: '4px' }}>From Money Snapshot: Subscriptions</p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Savings: {formatCurrency(currentSavings)}</span>
                <span>Target: {formatCurrency(twentyPercent)}</span>
                <span style={{ color: currentSavings >= twentyPercent ? '#00A86B' : '#b60232' }}>{currentSavings >= twentyPercent ? 'On Track' : 'Behind target'}</span>
              </div>
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '6px', height: '6px' }}>
                <div style={{ backgroundColor: '#00A86B', width: `${Math.min((currentSavings / twentyPercent) * 100, 100)}%`, height: '6px', borderRadius: '6px' }}></div>
              </div>
              <p style={{ fontSize: '10px', color: '#acacac', marginTop: '4px' }}>Set your monthly savings in Money Snapshot (Edit Mode)</p>
            </div>
          </div>
        )}
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
          <button className="btn-primary" style={{ marginTop: '12px' }} onClick={() => { if (nextMilestone && progress[nextMilestone.id] === "not-started") handleStatusChange(nextMilestone.id, "not-started"); }}>Start Milestone </button>
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

export default BalancedTrack;