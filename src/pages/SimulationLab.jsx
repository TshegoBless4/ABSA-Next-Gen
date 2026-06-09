// src/pages/SimulationLab.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCar, FaGlobe, FaInfoCircle, FaChartLine } from "react-icons/fa";

function SimulationLab() {
  const [selectedStudio, setSelectedStudio] = useState(null);

  const studios = [
    {
      id: "property",
      path: "/simulation-lab/property-vs-renting",
      title: "Property vs Renting Studio",
      icon: <FaHome size={28} />,
      color: "#F4A261",
      description: "Compare buying a property vs renting and investing the difference in Johannesburg.",
      whatIf: "What if I buy a property instead of renting?",
      timeHorizon: "5 years",
      saContext: "R1.8M property | R12K rent | Transfer duty ~R46K"
    },
    {
      id: "car",
      path: "/simulation-lab/car-vs-invest",
      title: "Car vs Invest Studio",
      icon: <FaCar size={28} />,
      color: "#00A86B",
      description: "See the 5-year cost of financing a luxury car vs using Uber and investing the savings.",
      whatIf: "What if I buy a luxury car instead of using Uber?",
      timeHorizon: "5 years",
      saContext: "R600K car | 12% interest | 30% balloon payment"
    },
    {
      id: "offshore",
      path: "/simulation-lab/local-offshore",
      title: "Local vs Offshore Studio",
      icon: <FaGlobe size={28} />,
      color: "#287ccf",
      description: "Compare different investment allocation strategies and see currency impact.",
      whatIf: "What if I invest offshore instead of locally?",
      timeHorizon: "5-10 years",
      saContext: "R18.50/USD | TFSA limit R46K/year | RA deduction 27.5%"
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Simulation Lab</h1>
        <p style={{ color: '#acacac', fontSize: '16px' }}>
          Test "what-if" scenarios and see outcomes over 3-5 years. Each studio provides interactive sliders,
          real-time calculations, and a personalized verdict based on your inputs.
        </p>
      </div>

      {/* Studio Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {studios.map((studio) => (
          <div 
            key={studio.id} 
            className="card" 
            style={{ 
              padding: '24px',
              background: '#1a1a2e',
              borderTop: `4px solid ${studio.color}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: selectedStudio === studio.id ? `2px solid ${studio.color}` : 'none',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-4px)'; 
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = 'none'; 
            }}
            onClick={() => setSelectedStudio(studio.id)}
          >
            <div style={{ 
              width: '50px', 
              height: '50px', 
              backgroundColor: `${studio.color}20`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: studio.color
            }}>
              {studio.icon}
            </div>
            
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{studio.title}</h2>
            <p style={{ color: '#acacac', fontSize: '14px', marginBottom: '16px', flex: 1 }}>{studio.description}</p>
            
            {/* Studio Details Box */}
            <div style={{ backgroundColor: '#2d2729', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: studio.color, marginBottom: '4px' }}>
                <FaChartLine size={10} style={{ display: 'inline', marginRight: '6px' }} /> 
                {studio.whatIf}
              </p>
              <p style={{ fontSize: '11px', color: '#acacac', marginTop: '6px' }}>
                Time horizon: {studio.timeHorizon}
              </p>
              <p style={{ fontSize: '11px', color: '#acacac' }}>
                SA context: {studio.saContext}
              </p>
            </div>
            
            <Link 
              to={studio.path} 
              className="btn-primary" 
              style={{ display: 'block', textAlign: 'center', marginTop: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              Try Now 
            </Link>
          </div>
        ))}
      </div>

      {/* Educational Note */}
      <div className="card" style={{ backgroundColor: '#00336620', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <FaInfoCircle color="#F4A261" size={18} />
          <h3 style={{ marginBottom: '0', fontSize: '16px' }}>How Studios Work</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#acacac', lineHeight: '1.5' }}>
          Each studio lets you adjust variables using interactive sliders. See real-time calculations,
          compare scenarios, and get a personalized studio verdict based on South African financial context.
          All calculations include SA-specific factors like tax, interest rates, and market norms.
        </p>
      </div>
    </div>
  );
}

export default SimulationLab;