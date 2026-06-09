// src/pages/Tracks.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBalanceScale, FaGlobe } from "react-icons/fa";

function Tracks() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    { id: "firstProperty", path: "/tracks/first-property", title: "First Property Path", icon: <FaHome size={40} />, gradient: "linear-gradient(135deg, #ff780f 0%, #b60232 100%)", badge: "Most Popular", audience: "For future homeowners", description: "Build your deposit, improve your credit score, and buy your first home within 5 years.", milestones: ["Year 1: Build deposit fund", "Year 2: Clear debt", "Year 3: Bond pre-approval", "Year 4: View properties", "Year 5: Offer accepted"], tradeoffs: ["Slower investment growth", "Less liquidity", "Maintenance costs"] },
    { id: "balanced", path: "/tracks/balanced", title: "Balanced Lifestyle & Investor", icon: <FaBalanceScale size={40} />, gradient: "linear-gradient(135deg, #00A86B 0%, #003366 100%)", badge: "Recommended", audience: "For flexibility seekers", description: "Follow the 50/30/20 rule - enjoy today while building wealth for tomorrow.", milestones: ["Year 1: Emergency fund", "Year 2: Start investing", "Year 3: Diversify", "Year 4: Grow portfolio", "Year 5: Passive income"], tradeoffs: ["Slower wealth building", "Moderate risk", "Balanced lifestyle"] },
    { id: "aggressive", path: "/tracks/aggressive", title: "Aggressive Global Investor", icon: <FaGlobe size={40} />, gradient: "linear-gradient(135deg, #003366 0%, #00A86B 100%)", badge: "High Risk/High Reward", audience: "For high risk tolerance", description: "Maximise growth through offshore diversification and tax-efficient investing.", milestones: ["Year 1: Max TFSA", "Year 2: Offshore account", "Year 3: 40% offshore", "Year 4: Direct USD/EUR", "Year 5: R1M portfolio"], tradeoffs: ["Higher volatility", "Currency risk", "Less accessible funds"] }
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Choose Your Strategy Track</h1>
        <p style={{ color: '#acacac', fontSize: '16px' }}>Select a 5-year financial path tailored to your goals, risk tolerance, and lifestyle preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {tracks.map((track) => (
          <div key={track.id} className="card" style={{ padding: '0', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', border: selectedTrack === track.id ? '2px solid #F4A261' : 'none', display: 'flex', flexDirection: 'column' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => setSelectedTrack(track.id)}>
            <div style={{ background: track.gradient, padding: '24px', color: 'white', textAlign: 'center' }}>
              <div style={{ marginBottom: '12px' }}>{track.icon}</div>
              <h2 style={{ color: 'white', marginBottom: '4px' }}>{track.title}</h2>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', marginTop: '8px' }}>{track.badge}</div>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#acacac', marginBottom: '16px', fontSize: '14px' }}>{track.audience}</p>
                <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>{track.description}</p>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#F4A261', marginBottom: '8px' }}>Key Milestones</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{track.milestones.map((m, i) => (<span key={i} style={{ fontSize: '11px', backgroundColor: '#2d2729', padding: '4px 10px', borderRadius: '20px', color: '#acacac' }}>{m}</span>))}</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#b60232', marginBottom: '8px' }}>Trade-offs</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{track.tradeoffs.map((t, i) => (<span key={i} style={{ fontSize: '11px', backgroundColor: '#2d2729', padding: '4px 10px', borderRadius: '20px', color: '#acacac' }}>{t}</span>))}</div>
                </div>
              </div>
              <Link to={track.path} className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: 'auto' }}>View Track </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracks;