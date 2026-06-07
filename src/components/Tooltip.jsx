// src/components/Tooltip.jsx
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}>
      <FaInfoCircle
        size={12}
        color="#acacac"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1a1a2e',
          color: '#acacac',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          width: '220px',
          textAlign: 'center',
          zIndex: 1000,
          border: '1px solid #acacac',
          marginBottom: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: '#1a1a2e transparent transparent transparent'
          }} />
        </div>
      )}
    </span>
  );
}

export default Tooltip;