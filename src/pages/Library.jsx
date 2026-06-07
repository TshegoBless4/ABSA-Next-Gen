// src/pages/Library.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const terms = [
    { term: "TFSA (Tax-Free Savings Account)", definition: "An investment account where all growth is tax-free. Annual limit: R46,000. Lifetime limit: R500,000.", category: "investing" },
    { term: "RA (Retirement Annuity)", definition: "Tax-deductible retirement savings. Contribute up to 27.5% of your income, locked until age 55.", category: "retirement" },
    { term: "Transfer Duty", definition: "Tax paid to SARS when buying property. For a R1.8M home, expect around R46,000.", category: "property" },
    { term: "Balloon Payment", definition: "A large final payment at the end of a vehicle finance agreement. Common in SA car loans.", category: "vehicle" },
    { term: "Offshore Investing", definition: "Investing outside South Africa protects against rand weakness and diversifies risk.", category: "investing" },
    { term: "Prime Rate", definition: "The benchmark interest rate used by South African banks. Currently ±11.75%.", category: "banking" },
    { term: "PAYE", definition: "Pay-As-You-Earn - income tax deducted from your salary by your employer.", category: "tax" },
    { term: "SARS", definition: "South African Revenue Service - the country's tax authority.", category: "tax" },
    { term: "ETF", definition: "Exchange-Traded Fund - a basket of securities that trades on an exchange.", category: "investing" },
    { term: "REIT", definition: "Real Estate Investment Trust - own property without buying it directly.", category: "investing" },
  ];

  const categories = [
    { id: 'all', name: 'All' }, { id: 'investing', name: 'Investing' }, { id: 'property', name: 'Property' },
    { id: 'vehicle', name: 'Vehicle' }, { id: 'tax', name: 'Tax' }, { id: 'retirement', name: 'Retirement' }, { id: 'banking', name: 'Banking' }
  ];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Financial Library</h1>
      <p style={{ marginBottom: '24px', color: '#acacac' }}>Search and learn key financial concepts.</p>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#acacac' }} />
            <input type="text" placeholder="Search financial terms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ paddingLeft: '36px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 16px', fontSize: '12px' }}>{cat.name}</button>))}
          </div>
        </div>
      </div>

      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#acacac' }}>Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {filteredTerms.map((item, index) => (
          <div key={index} className="card">
            <h3 style={{ color: '#F4A261' }}>{item.term}</h3>
            <p style={{ color: '#acacac', lineHeight: '1.5' }}>{item.definition}</p>
            <div style={{ marginTop: '8px' }}><span style={{ fontSize: '11px', backgroundColor: '#2d2729', padding: '2px 8px', borderRadius: '12px', color: '#acacac' }}>{categories.find(c => c.id === item.category)?.name || item.category}</span></div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (<div className="card" style={{ textAlign: 'center', padding: '40px' }}><p style={{ color: '#acacac' }}>No terms found matching your search.</p></div>)}
    </div>
  );
}

export default Library;