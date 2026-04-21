import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function FirstPropertyTrack() {
  const { userData, updateTrackProgress, netPay } = useContext(UserContext);
  const progress = userData.trackProgress.firstProperty;

  const milestones = [
    {
      id: "milestone1",
      name: "Build Deposit Fund",
      year: "Year 1",
      targetDate: "December 2025",
      targetAmount: 50000,
      description: "Save R50,000 for your property deposit",
    },
    {
      id: "milestone2",
      name: "Clear Negative Debt",
      year: "Year 2",
      targetDate: "December 2026",
      targetAmount: 25000,
      description: "Pay off credit cards and loans",
    },
    {
      id: "milestone3",
      name: "Bond Pre-Approval",
      year: "Year 3",
      targetDate: "December 2027",
      targetAmount: 0,
      description: "Get pre-approved for a home loan",
    },
    {
      id: "milestone4",
      name: "View Properties",
      year: "Year 4",
      targetDate: "December 2028",
      targetAmount: 0,
      description: "View 15+ properties in your target area",
    },
    {
      id: "milestone5",
      name: "Offer Accepted",
      year: "Year 5",
      targetDate: "December 2029",
      targetAmount: 0,
      description: "Submit offer and complete transfer",
    },
  ];

  const getStatusIcon = (status) => {
    if (status === "completed") return "✅";
    if (status === "in-progress") return "🔄";
    return "⏳";
  };

  const getStatusText = (status) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Not Started";
  };

  const getProgressPercentage = (milestoneId) => {
    if (milestoneId === "milestone1") {
      return Math.min((userData.propertyDepositCurrent / 50000) * 100, 100);
    }
    if (milestoneId === "milestone2") {
      const totalDebt = userData.creditCardDebt + userData.studentLoan;
      const originalDebt = 145000;
      return Math.min(((originalDebt - totalDebt) / originalDebt) * 100, 100);
    }
    if (progress[milestoneId] === "completed") return 100;
    if (progress[milestoneId] === "in-progress") return 50;
    return 0;
  };

  const handleStatusChange = (milestoneId, currentStatus) => {
    if (currentStatus === "completed") return;
    let newStatus = "in-progress";
    if (currentStatus === "in-progress") newStatus = "completed";
    updateTrackProgress("firstProperty", milestoneId, newStatus);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate months into journey
  const startDate = new Date(2025, 0, 1);
  const currentDate = new Date();
  const monthsIntoJourney = Math.max(
    0,
    Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30)),
  );

  // Find next milestone
  const nextMilestone = milestones.find((m) => progress[m.id] !== "completed");

  //  DYNAMIC RECOMMENDATIONS BASED ON USER INPUTS
  const depositProgress = (userData.propertyDepositCurrent / 50000) * 100;
  const hasHighDebt = userData.creditCardDebt + userData.studentLoan > 50000;
  const savingsRate =
    (userData.emergencyFundCurrent + userData.propertyDepositCurrent) / netPay;

  const getDynamicRecommendation = () => {
    if (depositProgress < 20 && userData.propertyDepositCurrent < 10000) {
      return {
        type: "warning",
        title: "⚠️ Deposit Savings Behind Target",
        message: `You've saved ${formatCurrency(userData.propertyDepositCurrent)} towards your deposit. Try saving an extra R2,000-3,000 per month to reach your R50,000 goal in 5 years.`,
        action: "Increase Savings",
      };
    }
    if (hasHighDebt && progress.milestone2 === "not-started") {
      return {
        type: "warning",
        title: "📉 High Debt Detected",
        message: `You have ${formatCurrency(userData.creditCardDebt + userData.studentLoan)} in debt. Prioritise clearing this before applying for a home bond.`,
        action: "Focus on Debt",
      };
    }
    if (depositProgress >= 50) {
      return {
        type: "success",
        title: "🎉 Amazing Deposit Progress!",
        message: `You've saved ${depositProgress.toFixed(0)}% of your deposit target. At this rate, you'll be ready to buy in under 3 years!`,
        action: "View Properties Early",
      };
    }
    if (savingsRate < 0.15) {
      return {
        type: "info",
        title: "💡 Savings Tip",
        message: `You're currently saving ${(savingsRate * 100).toFixed(0)}% of your income. Try to save 15-20% to build your deposit faster.`,
        action: "Review Budget",
      };
    }
    return {
      type: "success",
      title: "✅ On Track!",
      message:
        "You are making good progress toward home ownership. Keep following your milestones!",
      action: "Continue",
    };
  };

  const recommendation = getDynamicRecommendation();
  const recommendationColors = {
    warning: { bg: "#FEF3C7", border: "#F4A261", text: "#92400E" },
    success: { bg: "#D1FAE5", border: "#00A86B", text: "#065F46" },
    info: { bg: "#DBEAFE", border: "#003366", text: "#1E40AF" },
  };

  // Track nudge message
  const getNudgeMessage = () => {
    if (depositProgress < 20)
      return "Your deposit fund is behind target. Consider redirecting R2,000/month from dining out to catch up by June.";
    if (depositProgress >= 50)
      return "🎉 You're ahead of your First Property Path! At this rate, you'll reach your deposit target 4 months early. Keep it up!";
    return "You're on track! Keep saving and you'll reach your deposit goal on schedule.";
  };

  // Calculate bond affordability
  const maxAffordableBond = netPay * 0.3;
  const estimatedPropertyPrice = maxAffordableBond / 0.009;

  return (
    <div>
      {/* Breadcrumb - Wireframe */}
      {/* <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "16px" }}>
        Strategy Tracks / First Property Path
      </p> */}

      {/* Header - PRD Requirement */}
      <h1 style={{ paddingRight: "700px" }}>Your First Property Path</h1>
      <p style={{ marginBottom: "8px", color: "#acacac" }}>
        You're {monthsIntoJourney} months into your 5-year journey
      </p>

      {/* Track Description Card - Wireframe */}
      <div
        className="card"
        style={{
          marginBottom: "24px",
          background: "linear-gradient(135deg, #16110d 0%, #2d2729 85%)",
        }}
      >
        <p style={{ fontStyle: "Italic", color: "white" }}>
          "Buying your first home is one of the biggest financial decisions
          you'll make. This track helps you build a deposit, improve your credit
          score, and navigate the SA property market with confidence."
        </p>
      </div>

      {/* Progress Summary Card - PRD Requirement */}
      <div
        className="card"
        style={{
          marginBottom: "24px",
          background: "linear-gradient(135deg, #ff780f 20%, #b60232 75%)",
          color: "white",
        }}
      >
        <h3 style={{ color: "#acacac", marginBottom: "16px" }}>
          Your Progress Summary
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>
              {milestones.filter((m) => progress[m.id] === "completed").length}
            </p>
            <p style={{ fontSize: "12px" }}>Milestones Completed</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>
              {Math.round(depositProgress)}%
            </p>
            <p style={{ fontSize: "12px" }}>Deposit Progress</p>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>
              {formatCurrency(userData.propertyDepositCurrent)}
            </p>
            <p style={{ fontSize: "12px" }}>Saved of R50,000</p>
          </div>
        </div>
      </div>

      {/* Timeline Visualisation (5 years with milestone markers) - PRD & Wireframe */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h2>Your 5-Year Timeline</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "10%",
              right: "10%",
              height: "4px",
              backgroundColor: "#E2E8F0",
              zIndex: 0,
            }}
          ></div>
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              style={{ textAlign: "center", zIndex: 1, flex: 1 }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  backgroundColor:
                    progress[milestone.id] === "completed"
                      ? "#00A86B"
                      : progress[milestone.id] === "in-progress"
                        ? "#F4A261"
                        : "#E2E8F0",
                }}
              >
                {getStatusIcon(progress[milestone.id])}
              </div>
              <div style={{ fontWeight: "bold", marginTop: "8px" }}>
                {milestone.year}
              </div>
              <div style={{ fontSize: "12px", color: "#acacac" }}>
                {milestone.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Recommendation Card - Assignment Requirement */}
      <div
        className="card"
        style={{
          marginBottom: "24px",
          backgroundColor: recommendationColors[recommendation.type].bg,
          borderLeft: `4px solid ${recommendationColors[recommendation.type].border}`,
        }}
      >
        <h3
          style={{
            color: recommendationColors[recommendation.type].text,
            marginBottom: "8px",
          }}
        >
          {recommendation.title}
        </h3>
        <p style={{ color: recommendationColors[recommendation.type].text }}>
          {recommendation.message}
        </p>
        <button
          className="btn-primary"
          style={{
            marginTop: "12px",
            backgroundColor: recommendationColors[recommendation.type].border,
          }}
        >
          {recommendation.action}
        </button>
      </div>

      {/* Bond Affordability Estimate - SA Context */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h2> What Can You Afford?</h2>
        <p>
          Based on your net income of <strong>{formatCurrency(netPay)}</strong>{" "}
          per month:
        </p>
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "",

            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Estimated affordable bond:</strong>{" "}
            {formatCurrency(maxAffordableBond)}/month
          </p>
          <p>
            <strong>Estimated property price:</strong>{" "}
            {formatCurrency(estimatedPropertyPrice)}
          </p>
          <p style={{ fontSize: "12px", color: "#acacac", marginTop: "8px" }}>
            ⓘ Based on 30% of net income on bond payments (prime rate ~11.75%)
          </p>
        </div>
      </div>

      {/* Next Up Section - PRD Requirement */}
      {nextMilestone && (
        <div
          className="card"
          style={{ marginBottom: "24px", backgroundColor: "#F4A26110" }}
        >
          <h3> Next Up: {nextMilestone.name}</h3>
          <p style={{ marginTop: "8px" }}>{nextMilestone.description}</p>
          <div style={{ marginTop: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "14px" }}>Progress</span>
              <span style={{ fontSize: "14px" }}>
                {Math.round(getProgressPercentage(nextMilestone.id))}%
              </span>
            </div>
            <div
              style={{
                backgroundColor: "#E2E8F0",
                borderRadius: "8px",
                height: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#b60232 ",
                  width: `${getProgressPercentage(nextMilestone.id)}%`,
                  height: "8px",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <p style={{ fontSize: "12px", color: "#acacac", marginTop: "8px" }}>
              Target: {nextMilestone.targetDate}
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ marginTop: "16px" }}
            onClick={() => {
              if (
                nextMilestone &&
                progress[nextMilestone.id] === "not-started"
              ) {
                handleStatusChange(nextMilestone.id, "not-started");
              }
            }}
          >
            Update My Progress
          </button>
        </div>
      )}

      {/* Milestone Checklist with Progress Tracking - PRD Requirement */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h2>Milestone Checklist</h2>
        <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "16px" }}>
          Track your progress through each milestone
        </p>
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            style={{
              padding: "16px",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <h3 style={{ marginBottom: "0" }}>{milestone.name}</h3>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    backgroundColor:
                      progress[milestone.id] === "completed"
                        ? "#00A86B20"
                        : progress[milestone.id] === "in-progress"
                          ? "#F4A26120"
                          : "#E2E8F0",
                    color:
                      progress[milestone.id] === "completed"
                        ? "#00A86B"
                        : progress[milestone.id] === "in-progress"
                          ? "#F4A261"
                          : "#64748B",
                  }}
                >
                  {getStatusText(progress[milestone.id])}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                {milestone.description}
              </p>
              <div style={{ marginTop: "8px", width: "60%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>Progress</span>
                  <span style={{ fontSize: "12px" }}>
                    {Math.round(getProgressPercentage(milestone.id))}%
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: "#E2E8F0",
                    borderRadius: "8px",
                    height: "6px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        progress[milestone.id] === "completed"
                          ? "#00A86B"
                          : "#b60232 ",
                      width: `${getProgressPercentage(milestone.id)}%`,
                      height: "6px",
                      borderRadius: "8px",
                    }}
                  ></div>
                </div>
              </div>
              <p
                style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}
              >
                Target: {milestone.targetDate}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              {progress[milestone.id] !== "completed" && (
                <button
                  className="btn-secondary"
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() =>
                    handleStatusChange(milestone.id, progress[milestone.id])
                  }
                >
                  {progress[milestone.id] === "in-progress"
                    ? "Mark Complete"
                    : "Start Milestone"}
                </button>
              )}
              {progress[milestone.id] === "completed" && (
                <span style={{ color: "#00A86B" }}>✓ Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Track Recommendations + SA Context - Wireframe */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Track-Specific Recommendations - PRD Requirement */}
        <div className="card">
          <h2>Recommendations </h2>
          <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
            <li>
              Open a Tax-Free Savings Account (TFSA) for your deposit – growth
              is tax-free! (R46,000/year)
            </li>
            <li>
              Check your credit score regularly – aim for 650+ for the best bond
              rates.
            </li>
            <li>
              Research suburbs early – property prices in Sandton grow ~5%
              annually.
            </li>
            {depositProgress < 30 && (
              <li style={{ color: "#F4A261" }}>
                ⚠️ Consider cutting back on discretionary spending to boost your
                deposit savings.
              </li>
            )}
          </ul>
        </div>

        {/* SA Context - Assignment Requirement */}
        <div className="card">
          <h3>SA Context</h3>
          <ul
            style={{ marginLeft: "20px", lineHeight: "1.8", marginTop: "12px" }}
          >
            <li>Prime rate: 11.75%</li>
            <li>Transfer duty (R1.8M): ~R46,000</li>
            <li>Bond registration fees: ~R30,000</li>
            <li>Monthly levies: R2,000–R4,000</li>
            <li>Property appreciation (JHB): 5% p/a</li>
          </ul>
          <button
            className="btn-secondary"
            style={{ marginTop: "16px", width: "100%" }}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Nudge Feed - PRD Requirement */}
      <div
        className="card"
        style={{
          marginBottom: "24px",
          background: "linear-gradient(135deg, #16110d 0%, #2d2729 85%)",
        }}
      >
        <h3>💬 Nudge Feed</h3>
        <p style={{ marginTop: "8px" }}>{getNudgeMessage()}</p>
        <button
          className="btn-secondary"
          style={{ marginTop: "12px", padding: "6px 12px", fontSize: "12px" }}
        >
          Share Milestone
        </button>
      </div>

      {/* Key Tradeoffs to Consider - PRD Requirement */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h2> Key Tradeoffs to Consider</h2>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>
            <strong>Slower investment growth</strong> vs. long-term property
            equity
          </li>
          <li>
            <strong>Less liquidity</strong> vs. forced savings through bond
            payments
          </li>
          <li>
            <strong>Maintenance costs</strong> (1% of property value annually)
            vs. rental flexibility
          </li>
        </ul>
      </div>

      {/* Related Studios - Wireframe */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h3>Related Studios</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              padding: "12px",
              backgroundColor: "#ff780f",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Property vs Renting Studio</strong>
            </p>
            <p style={{ fontSize: "14px", color: "#acacac" }}>
              Compare buying vs renting in Johannesburg
            </p>
            <Link
              to="/simulation-lab/property-vs-renting"
              className="btn-secondary"
              style={{
                marginTop: "8px",
                display: "inline-block",
                padding: "6px 12px",
                fontSize: "12px",
              }}
            >
              Try Now
            </Link>
          </div>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#ff780f",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>First-Time Buyer Guide</strong>
            </p>
            <p style={{ fontSize: "14px", color: "#acacac" }}>
              Everything you need to know before buying
            </p>
            <button
              className="btn-secondary"
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                fontSize: "12px",
              }}
            >
              Read Article
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons - PRD Requirement */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          paddingBottom: "60px",
        }}
      >
        <button className="btn-secondary">Switch Track</button>
        <button className="btn-secondary">Update My Progress</button>
        <button className="btn-primary">Share Milestone </button>
      </div>
    </div>
  );
}

export default FirstPropertyTrack;
