// src/pages/Library.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const terms = [
    // Existing terms
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
    
    // Money Snapshot terms
    { term: "Net Monthly Pay", definition: "Your take-home pay after PAYE tax and medical aid credits. This is what you actually receive in your bank account each month.", category: "tax" },
    { term: "Medical Tax Credit", definition: "A tax credit for medical aid contributions. Currently R364 per month for the main member and R246 for each dependent.", category: "tax" },
    { term: "Fixed Costs", definition: "Monthly expenses that stay relatively constant, like rent, bond, insurance, vehicle finance, and monthly debt payments.", category: "budgeting" },
    { term: "Disposable Income", definition: "Money left after paying all fixed costs. This is what you can use for savings, investments, and discretionary spending.", category: "budgeting" },
    { term: "Monthly Debt Payment", definition: "The total amount you pay each month toward all your debts, including credit cards, personal loans, student loans, and other debt obligations.", category: "debt" },
    { term: "Debt-to-Income Ratio", definition: "Your total monthly debt payments divided by your gross monthly income. Lenders prefer this to be below 40%.", category: "debt" },
    
    // Balanced Track - 50/30/20 Rule
    { term: "50/30/20 Rule", definition: "A budgeting framework where 50% of income goes to needs, 30% to wants, and 20% to savings and debt repayment.", category: "budgeting" },
    { term: "Emergency Fund", definition: "Savings set aside for unexpected expenses like job loss or medical emergencies. Aim for 3-6 months of living expenses.", category: "savings" },
    
    // First Property Track
    { term: "Bond (Home Loan)", definition: "A loan from a bank to buy property. Your monthly payment includes principal and interest, typically over 20-30 years.", category: "property" },
    { term: "Bond Pre-approval", definition: "A letter from a bank indicating how much they're willing to lend you for a property, based on your income and credit history.", category: "property" },
    { term: "Bond Registration Fees", definition: "Legal fees paid to register a home loan in your name at the Deeds Office. Typically around R30,000 for a standard bond.", category: "property" },
    { term: "Property Deposit", definition: "The upfront payment when buying a property, usually 10-20% of the purchase price. A larger deposit means smaller monthly bond payments.", category: "property" },
    { term: "Transfer Costs", definition: "Total fees when buying a property including transfer duty, bond registration, and conveyancing fees. Budget 5-8% of property value.", category: "property" },
    { term: "Levies", definition: "Monthly fees for sectional title properties (townhouses, apartments) covering building insurance, common area maintenance, and security.", category: "property" },
    
    // Aggressive Track
    { term: "Offshore Allocation", definition: "The percentage of your investment portfolio held in international markets (US, Europe, Asia) rather than South Africa.", category: "investing" },
    { term: "Currency Risk", definition: "The risk that exchange rate movements will affect your offshore investments. A weaker rand benefits offshore returns.", category: "investing" },
    { term: "Exchange Rate", definition: "The value of one currency compared to another. Currently around R18.50 per US Dollar.", category: "investing" },
    
    // Car Studio
    { term: "Vehicle Depreciation", definition: "The loss in car value over time. New cars lose 20-30% in the first year and about 60% after 5 years.", category: "vehicle" },
    { term: "Opportunity Cost", definition: "What you give up by choosing one option over another. For example, investing car payments instead of buying a luxury car.", category: "investing" },
    
    // Property Studio
    { term: "Bond vs Rent", definition: "The decision between buying a property (paying bond, maintenance, rates) or renting and investing the difference.", category: "property" },
    
    // General Investing
    { term: "Compound Interest", definition: "Interest earned on both your initial investment and previously earned interest. Albert Einstein called it the 'eighth wonder of the world'.", category: "investing" },
    { term: "Diversification", definition: "Spreading investments across different asset classes (stocks, bonds, property) and geographies to reduce risk.", category: "investing" },
    { term: "Rebalancing", definition: "Adjusting your portfolio back to target allocations (e.g., 60% local, 40% offshore) as market movements change percentages.", category: "investing" },
    { term: "Passive Income", definition: "Money earned with minimal active effort, such as dividends, rental income, or interest from investments.", category: "investing" },
    { term: "Credit Score", definition: "A number that represents your creditworthiness. Used by banks to decide loan amounts and interest rates. Pay bills on time to improve it.", category: "banking" },
    { term: "Interest Rate", definition: "The cost of borrowing money, expressed as a percentage. Higher rates mean more expensive loans and better savings returns.", category: "banking" },
  ];

  const categories = [
    { id: 'all', name: 'All' }, 
    { id: 'investing', name: 'Investing' }, 
    { id: 'property', name: 'Property' },
    { id: 'vehicle', name: 'Vehicle' }, 
    { id: 'tax', name: 'Tax' }, 
    { id: 'retirement', name: 'Retirement' }, 
    { id: 'banking', name: 'Banking' },
    { id: 'budgeting', name: 'Budgeting' },
    { id: 'debt', name: 'Debt' },
    { id: 'savings', name: 'Savings' }
  ];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Financial Library</h1>
      <p style={{ marginBottom: '24px', color: '#acacac' }}>Search and learn key financial concepts used throughout the app.</p>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#acacac' }} />
            <input 
              type="text" 
              placeholder="Search financial terms..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ paddingLeft: '36px', width: '100%' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.id)} 
                className={selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'} 
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#acacac' }}>
        Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {filteredTerms.map((item, index) => (
          <div key={index} className="card">
            <h3 style={{ color: '#F4A261' }}>{item.term}</h3>
            <p style={{ color: '#acacac', lineHeight: '1.5' }}>{item.definition}</p>
            <div style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '11px', backgroundColor: '#2d2729', padding: '2px 8px', borderRadius: '12px', color: '#acacac' }}>
                {categories.find(c => c.id === item.category)?.name || item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#acacac' }}>No terms found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Library;