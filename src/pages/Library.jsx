import React from "react";

function Library() {
  const terms = [
    {
      term: "TFSA (Tax-Free Savings Account)",
      definition:
        "An investment account where all growth is tax-free. Annual limit: R46,000. Lifetime limit: R500,000.",
    },
    {
      term: "RA (Retirement Annuity)",
      definition:
        "Tax-deductible retirement savings. Contribute up to 27.5% of your income, locked until age 55.",
    },
    {
      term: "Transfer Duty",
      definition:
        "Tax paid to SARS when buying property. For a R1.8M home, expect around R46,000.",
    },
    {
      term: "Balloon Payment",
      definition:
        "A large final payment at the end of a vehicle finance agreement. Common in SA car loans.",
    },
    {
      term: "Offshore Investing",
      definition:
        "Investing outside South Africa protects against rand weakness and diversifies risk.",
    },
    {
      term: "Prime Rate",
      definition:
        "The benchmark interest rate used by South African banks. Currently ±11.75%.",
    },
  ];

  return (
    <div>
      <h1>Financial Library</h1>
      <p>Learn key financial concepts.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        {terms.map((item, index) => (
          <div key={index} className="card">
            <h3>📚 {item.term}</h3>
            <p>{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
