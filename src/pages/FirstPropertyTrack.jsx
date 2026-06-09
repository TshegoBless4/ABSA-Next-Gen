// src/pages/FirstPropertyTrack.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import { FaHome, FaChartLine, FaCreditCard, FaFileSignature, FaSearch, FaCheckCircle, FaSpinner, FaCircle, FaInfoCircle, FaExclamationTriangle, FaMapMarker, FaLightbulb, FaQuestionCircle } from "react-icons/fa";

function FirstPropertyTrack() {
  const { userData, updateTrackProgress, netPay } = useContext(AuthContext);
  const progress = userData.trackProgress.firstProperty;
  const [showTips, setShowTips] = useState({});

  const hasValidIncome = userData.grossMonthlyIncome > 0;
  const hasValidNetPay = netPay > 0;

  // FIXED: Get deposit data - checks multiple possible key formats
  const getDepositData = () => {
    // Try different possible key formats
    const target = userData.propertyDepositTarget || 
                   userData.propertydepositTarget || 
                   userData.propertyDeposit?.target || 0;
    const current = userData.propertyDepositCurrent || 
                    userData.propertydepositCurrent || 
                    userData.propertyDeposit?.current || 0;
    return { target, current };
  };

  const depositData = getDepositData();
  const depositSaved = depositData.current;
  const depositTarget = depositData.target;
  const depositProgress = depositTarget > 0 ? Math.min((depositSaved / depositTarget) * 100, 100) : 0;

  // Debug log
  useEffect(() => {
    console.log('FirstPropertyTrack - Deposit Data:', { depositSaved, depositTarget, depositProgress });
    console.log('Full userData keys:', Object.keys(userData));
  }, [userData]);

  const milestones = [
    { id: "milestone1", name: "Build Deposit Fund", year: "Year 1", targetDate: "December 2026", icon: <FaHome />, description: "Save for your property deposit", tip: "Open a TFSA for tax-free growth. Aim for 10-20% of property value." },
    { id: "milestone2", name: "Clear Negative Debt", year: "Year 2", targetDate: "December 2027", icon: <FaCreditCard />, description: "Pay off credit cards and loans", tip: "Focus on high-interest debt first." },
    { id: "milestone3", name: "Bond Pre-Approval", year: "Year 3", targetDate: "December 2028", icon: <FaFileSignature />, description: "Get pre-approved for a home loan", tip: "Get pre-approved from 3 different banks to compare rates." },
    { id: "milestone4", name: "View Properties", year: "Year 4", targetDate: "December 2029", icon: <FaSearch />, description: "View properties in your target area", tip: "View at least 15 properties. Take notes and photos." },
    { id: "milestone5", name: "Offer Accepted", year: "Year 5", targetDate: "December 2030", icon: <FaCheckCircle />, description: "Submit offer and complete transfer", tip: "Budget for transfer duty (~R46k), bond fees (~R30k)." },
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
    updateTrackProgress("firstProperty", milestoneId, newStatus);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(amount);

  const startDate = new Date(2025, 0, 1);
  const currentDate = new Date();
  const monthsIntoJourney = Math.max(0, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30)));
  const yearsIntoJourney = monthsIntoJourney / 12;
  const nextMilestone = milestones.find((m) => progress[m.id] !== "completed");
  const completedCount = milestones.filter(m => progress[m.id] === "completed").length;
  const overallProgress = (completedCount / milestones.length) * 100;
  const maxAffordableBond = hasValidNetPay ? netPay * 0.3 : 0;
  const estimatedPropertyPrice = maxAffordableBond > 0 ? maxAffordableBond / 0.009 : 0;

  return (
    <div>
      {/* DATA SOURCE CARD */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620', borderLeft: '4px solid #F4A261' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaQuestionCircle size={20} color="#F4A261" />
            <div>
              <h3 style={{ marginBottom: '4px', fontSize: '16px' }}>How this track works</h3>
              <p style={{ fontSize: '12px', color: '#acacac', marginBottom: '4px' }}>
                Your deposit progress comes from the <strong>Property Deposit goal</strong> in Money Snapshot.
              </p>
              <p style={{ fontSize: '12px', color: '#acacac' }}>
                Your affordability estimate uses your <strong>monthly income</strong> from Money Snapshot.
              </p>
            </div>
          </div>
          <Link to="/money-snapshot" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
            Update in Money Snapshot 
          </Link>
        </div>
      </div>

      {/* Warning Banner - No Income */}
      {!hasValidIncome && (
        <div className="card" style={{ backgroundColor: '#b6023220', borderLeft: '4px solid #b60232', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaExclamationTriangle size={24} color="#b60232" />
            <div>
              <h3 style={{ color: '#b60232', marginBottom: '4px' }}>Income Data Missing</h3>
              <p style={{ color: '#acacac' }}>Please enter your income in Money Snapshot to see affordability estimates.</p>
              <Link to="/money-snapshot" className="btn-primary" style={{ marginTop: '8px', display: 'inline-block' }}>Go to Money Snapshot</Link>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FaHome size={28} color="#F4A261" />
          <h1 style={{ marginBottom: '0' }}>First Property Path</h1>
        </div>
        <p style={{ color: '#acacac' }}>Your 5-year journey to becoming a homeowner</p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div style={{ backgroundColor: '#2d2729', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#00A86B', width: `${overallProgress}%`, height: '100%', transition: 'width 0.5s ease' }}></div>
        </div>
        <p style={{ fontSize: '12px', color: '#acacac', marginTop: '8px' }}>You are {Math.floor(yearsIntoJourney)} years and {monthsIntoJourney % 12} months into your journey</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{completedCount}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Milestones Done</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{depositTarget > 0 ? `${Math.round(depositProgress)}%` : '—'}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Deposit Progress</p>
          {depositTarget === 0 && <p style={{ fontSize: '9px', color: '#acacac' }}>Set goal in Money Snapshot</p>}
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F4A261' }}>{depositSaved > 0 ? formatCurrency(depositSaved) : '—'}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Saved of {depositTarget > 0 ? formatCurrency(depositTarget) : '?'}</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: hasValidIncome ? '#F4A261' : '#acacac' }}>{hasValidIncome ? formatCurrency(estimatedPropertyPrice) : '—'}</p>
          <p style={{ fontSize: '11px', color: '#acacac' }}>Est. Property Price</p>
        </div>
      </div>

      {/* Affordability */}
      {hasValidIncome && (
        <div className="card" style={{ marginBottom: '24px', backgroundColor: '#00336620' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaInfoCircle size={16} /> What Can You Afford?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
            <div><p style={{ fontSize: '12px', color: '#acacac' }}>Net Monthly Income</p><p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCurrency(netPay)}</p></div>
            <div><p style={{ fontSize: '12px', color: '#acacac' }}>Max Bond Payment (30% of income)</p><p style={{ fontSize: '18px', fontWeight: 'bold', color: '#F4A261' }}>{formatCurrency(maxAffordableBond)}/month</p></div>
            <div><p style={{ fontSize: '12px', color: '#acacac' }}>Est. Property Value</p><p style={{ fontSize: '18px', fontWeight: 'bold', color: '#00A86B' }}>{formatCurrency(estimatedPropertyPrice)}</p></div>
            <div><p style={{ fontSize: '12px', color: '#acacac' }}>10% Deposit Needed</p><p style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCurrency(estimatedPropertyPrice * 0.1)}</p></div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaChartLine size={16} /> 5-Year Timeline</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap' }}>
          {milestones.map((milestone) => (
            <div key={milestone.id} style={{ textAlign: 'center', flex: 1, minWidth: '70px' }}>
              <div style={{
                width: '45px', height: '45px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: progress[milestone.id] === "completed" ? "#00A86B20" : progress[milestone.id] === "in-progress" ? "#F4A26120" : "#2d2729",
                border: `2px solid ${progress[milestone.id] === "completed" ? "#00A86B" : progress[milestone.id] === "in-progress" ? "#F4A261" : "#acacac"}`
              }}>
                {getStatusIcon(progress[milestone.id])}
              </div>
              <div style={{ fontWeight: 'bold', marginTop: '8px', fontSize: '11px' }}>{milestone.year}</div>
              <div style={{ fontSize: '9px', color: '#acacac' }}>{milestone.name.split(" ").slice(0,2).join(" ")}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Milestone */}
      {nextMilestone && (
        <div className="card" style={{ marginBottom: '24px', backgroundColor: '#F4A26110', borderLeft: '4px solid #F4A261' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FaMapMarker color="#F4A261" />
            <h3 style={{ marginBottom: '0', fontSize: '16px' }}>Next Milestone</h3>
          </div>
          <p style={{ fontWeight: 'bold' }}>{nextMilestone.name}</p>
          <p style={{ fontSize: '13px', color: '#acacac' }}>{nextMilestone.description}</p>
          <p style={{ fontSize: '11px', color: '#acacac', marginTop: '8px' }}>Target: {nextMilestone.targetDate}</p>
          <button className="btn-primary" style={{ marginTop: '12px' }} onClick={() => handleStatusChange(nextMilestone.id, progress[nextMilestone.id])}>
            {progress[nextMilestone.id] === "not-started" ? "Start Milestone " : "Update Progress →"}
          </button>
        </div>
      )}

      {/* Milestone List */}
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

export default FirstPropertyTrack;